import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { WinstonModuleOptions } from "nest-winston";
import { PapertrailTransport } from "winston-papertrail-transport";
import { transports } from "winston";
import Transport from "winston-transport";
import { formatter } from "@gemunionstudio/winston-formatter";
import os from "os";

@Injectable()
export class WinstonConfigService {
  constructor(private readonly configService: ConfigService) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const adaptors: Array<Transport> = [new transports.Console()];

    const nodeEnv = this.configService.get<string>("NODE_ENV", "development");

    if (nodeEnv !== "development" && nodeEnv !== "test") {
      const papertrailHost = this.configService.get<string>("PAPERTRAIL_HOST", "");
      const papertrailPort = this.configService.get<number>("PAPERTRAIL_PORT", 0);
      adaptors.push(
        new PapertrailTransport({
          host: papertrailHost,
          port: papertrailPort,
          hostname: `${os.hostname()}-${nodeEnv}`,
        }),
      );
    }

    return {
      format: formatter,
      transports: adaptors,
    };
  }
}
