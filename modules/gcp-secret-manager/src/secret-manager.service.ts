import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

import { IGcpSecretManagerOptions } from "./interfaces";
import { GCP_SECRET_MANAGER_OPTIONS_PROVIDER } from "./secret-manager.constants";

@Injectable()
export class SecretManagerService {
  private client: SecretManagerServiceClient;

  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(GCP_SECRET_MANAGER_OPTIONS_PROVIDER)
    options: IGcpSecretManagerOptions,
  ) {
    const { keyFile } = options;

    // Instantiates a client
    this.client = new SecretManagerServiceClient({
      keyFile,
    });
  }

  async getSecret(name: string): Promise<string | void> {
    return (
      // const [version] = await secretmanagerClient.accessSecretVersion({
      //   name: `projects/1011891726242/secrets/GEMUNION_PRIVATE_KEY/versions/1`,
      // });
      await this.client
        .accessSecretVersion({ name })
        .then(data => {
          const [response] = data;
          // return data.payload ? data.payload
          if ("payload" in response) {
            const { payload } = response;
            if (payload && "data" in payload) {
              const { data } = payload;
              if (data) {
                return payload.data ? payload.data.toString() : void 0;
              }
            }
          }
          return void 0;
        })
        .catch(e => {
          this.loggerService.error(e.message, e.stack, SecretManagerService.name);
          return void 0;
        })
    );
  }
}
