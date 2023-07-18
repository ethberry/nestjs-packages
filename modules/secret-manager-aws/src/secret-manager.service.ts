import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { SecretsManager } from "@aws-sdk/client-secrets-manager";

import type { ISecretManagerOptions } from "./interfaces";
import { SECRET_MANAGER_OPTIONS_PROVIDER } from "./secret-manager.constants";

@Injectable()
export class SecretManagerService {
  private client: SecretsManager;

  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(SECRET_MANAGER_OPTIONS_PROVIDER)
    private readonly options: ISecretManagerOptions,
  ) {
    const { accessKeyId, secretAccessKey, region } = this.options;
    this.client = new SecretsManager({ credentials: { accessKeyId, secretAccessKey }, region });
  }

  async getSecret(name: string, defaultValue: string): Promise<string> {
    return this.client
      .getSecretValue({ SecretId: name })
      .then(data => {
        if ("SecretString" in data) {
          return data.SecretString || defaultValue;
        } else if ("SecretBinary" in data) {
          // https://github.com/awsdocs/aws-doc-sdk-examples/blob/master/javascript/example_code/secrets/secrets_getsecretvalue.js
          return Buffer.from(data.SecretBinary as unknown as string, "base64").toString("ascii");
        }
        return defaultValue;
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, SecretManagerService.name);
        return defaultValue;
      });
  }
}
