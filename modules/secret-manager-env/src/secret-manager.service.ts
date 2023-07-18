import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SecretManagerService {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  async getSecret(name: string, defaultValue: string): Promise<string> {
    const value = this.configService.get<string>(name, defaultValue);

    if (!value) {
      const e = new Error(`${name} not found in env`);
      this.loggerService.error(e.message, e.stack, SecretManagerService.name);
    }

    return Promise.resolve(value);
  }
}
