import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

import {WinstonModuleOptions} from "nest-winston";
import {PapertrailTransport} from "winston-papertrail-transport";
import LogdnaWinstonTransport from "logdna-winston";
import {format, transports} from "winston";
import Transport from "winston-transport";
import chalk from "chalk";
import os from "os";
import path from "path";

@Injectable()
export class WinstonConfigService {
  constructor(private readonly configService: ConfigService) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const adaptors: Array<Transport> = [new transports.Console()];

    const nodeEnv = this.configService.get<string>("NODE_ENV", "development");

    if (nodeEnv !== "development" && nodeEnv !== "test") {
      const papertrailHost = this.configService.get<string>("PAPERTRAIL_HOST", "");
      const papertrailPort = this.configService.get<number>("PAPERTRAIL_PORT", 0);
      if (papertrailHost && papertrailPort) {
        adaptors.push(
          new PapertrailTransport({
            host: papertrailHost,
            port: papertrailPort,
            hostname: `${os.hostname()}-${nodeEnv}`,
          }),
        );
      }

      const logdnaIngestionKey = this.configService.get<string>("LOGDNA_INGESTION_KEY", "");
      if (logdnaIngestionKey) {
        adaptors.push(
          new LogdnaWinstonTransport({
            key: logdnaIngestionKey,
            hostname: os.hostname(),
            app: path.basename(process.cwd()),
            env: nodeEnv,
          }),
        );
      }
    }

    return {
      format: format.combine(
        format.timestamp(),
        format.printf(args => {
          const {level, context, timestamp, message, stack} = args;
          let color = chalk.green;
          let text = "";
          if (level === "error") {
            color = chalk.red;
            const lines = stack[0].split("\n");
            lines[0] = color(lines[0]);
            text = lines.join("\n");
          } else if (level === "info") {
            color = chalk.green;
            text = color(message);
          } else if (level === "warn") {
            color = chalk.yellow;
            text = color(message);
          } else if (level === "debug") {
            color = chalk.magentaBright;
            text = color(message);
          } else if (level === "verbose") {
            color = chalk.cyanBright;
            text = color(message);
          }

          return [
            color(`[Nest] ${process.pid}   -`),
            new Date(timestamp)
              .toISOString()
              .replace("T", " ")
              .replace(/\.\d{3}Z/, ""),
            context ? chalk.yellow(`[${context as string}]`) : "",
            text,
          ].join(" ");
        }),
      ),
      transports: adaptors,
    };
  }
}
