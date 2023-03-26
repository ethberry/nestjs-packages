import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { SecretsManager } from "@aws-sdk/client-secrets-manager";

import { ISecretManagerOptions } from "./interfaces";
import { SECRET_MANAGER_OPTIONS_PROVIDER } from "./secret-manager.constants";

@Injectable()
export class SecretManagerService {
  private client: SecretsManager;

  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(SECRET_MANAGER_OPTIONS_PROVIDER)
    options: ISecretManagerOptions,
  ) {
    const { accessKeyId, secretAccessKey, region } = options;
    this.client = new SecretsManager({ credentials: { accessKeyId, secretAccessKey }, region });
  }

  async getSecret(name: string): Promise<string | void> {
    return (
      this.client
        .getSecretValue({ SecretId: name })
        // .promise()
        .then(data => {
          if ("SecretString" in data) {
            return data.SecretString;
          } else if (data.SecretBinary) {
            // https://github.com/awsdocs/aws-doc-sdk-examples/blob/master/javascript/example_code/secrets/secrets_getsecretvalue.js
            return Buffer.from(data.SecretBinary as unknown as string, "base64").toString("ascii");
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
