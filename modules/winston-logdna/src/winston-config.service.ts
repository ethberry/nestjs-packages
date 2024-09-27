import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WinstonModuleOptions } from "nest-winston";
import LogdnaWinstonTransport from "logdna-winston";
import { transports } from "winston";
import Transport from "winston-transport";
import os from "os";
import path from "path";

import { formatter } from "@ethberry/winston-formatter";

@Injectable()
export class WinstonConfigService {
  constructor(private readonly configService: ConfigService) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const adaptors: Array<Transport> = [new transports.Console()];

    const nodeEnv = this.configService.get<string>("NODE_ENV", "development");
    const appName = this.configService.get<string>("APP_NAME", path.basename(process.cwd()));

    if (nodeEnv !== "development" && nodeEnv !== "test") {
      const logdnaIngestionKey = this.configService.get<string>("LOGDNA_INGESTION_KEY", "");
      adaptors.push(
        new LogdnaWinstonTransport({
          key: logdnaIngestionKey,
          hostname: os.hostname(),
          app: appName,
          env: nodeEnv,
        }),
      );
    }

    return {
      format: formatter,
      transports: adaptors,
    };
  }
}
