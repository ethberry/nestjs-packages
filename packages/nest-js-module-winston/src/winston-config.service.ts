import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {WinstonModuleOptions} from "nest-winston";
import {PapertrailTransport} from "winston-papertrail-transport";
import {format, transports} from "winston";
import Transport from "winston-transport";
import chalk from "chalk";

@Injectable()
export class WinstonConfigService {
  constructor(private readonly configService: ConfigService) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const adaptors: Array<Transport> = [new transports.Console()];

    const nodeEnv = this.configService.get<string>("NODE_ENV", "development");

    if (nodeEnv === "production") {
      adaptors.push(
        new PapertrailTransport({
          host: this.configService.get<string>("PAPERTRAIL_HOST", "localhost"),
          port: this.configService.get<number>("PAPERTRAIL_PORT", 0),
        }),
      );
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
