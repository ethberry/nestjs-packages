import { Injectable } from "@nestjs/common";
import { WinstonModuleOptions } from "nest-winston";
import { transports } from "winston";
import Transport from "winston-transport";

import { formatter } from "@ethberry/winston-formatter";

@Injectable()
export class WinstonConfigService {
  createWinstonModuleOptions(): WinstonModuleOptions {
    const adaptors: Array<Transport> = [new transports.Console()];

    return {
      format: formatter,
      transports: adaptors,
    };
  }
}
