import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

import type { ISecretManagerOptions } from "./interfaces";
import { SECRET_MANAGER_OPTIONS_PROVIDER } from "./secret-manager.constants";

@Injectable()
export class SecretManagerService {
  private client: SecretManagerServiceClient;

  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(SECRET_MANAGER_OPTIONS_PROVIDER)
    private readonly options: ISecretManagerOptions,
  ) {
    const { keyFile } = this.options;
    this.client = new SecretManagerServiceClient({ keyFile });
  }

  async getSecret(name: string, defaultValue: string): Promise<string> {
    return this.client
      .accessSecretVersion({ name })
      .then(data => {
        const [response] = data;
        if ("payload" in response) {
          const { payload } = response;
          if (payload && "data" in payload) {
            const { data } = payload;
            if (data) {
              return payload.data ? payload.data.toString() : defaultValue;
            }
          }
        }
        return defaultValue;
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, SecretManagerService.name);
        return defaultValue;
      });
  }
}
