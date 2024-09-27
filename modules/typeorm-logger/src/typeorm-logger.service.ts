import util from "util";
import { Logger as TypeOrmLogger, LoggerOptions as TypeOrmLoggerOptions } from "typeorm";
import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";

@Injectable()
export class TypeOrmLoggerService implements TypeOrmLogger {
  private options: TypeOrmLoggerOptions = "all";

  constructor(@Inject(Logger) private readonly loggerService: LoggerService) {}

  public setOptions(options: TypeOrmLoggerOptions = "all"): void {
    this.options = options;
  }

  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[]): void {
    if (
      this.options === "all" ||
      this.options === true ||
      (this.options instanceof Array && this.options.includes("query"))
    ) {
      this.loggerService.log(`query : ${query} ${this.stringifyParams(parameters)}`, "TypeOrm");
    }
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(error: string, query: string, parameters?: any[]): void {
    if (
      this.options === "all" ||
      this.options === true ||
      (this.options instanceof Array && this.options.includes("error"))
    ) {
      this.loggerService.log(`query failed: ${query} ${this.stringifyParams(parameters)}`, "TypeOrm");
      this.loggerService.log(`error: ${error}`, "TypeOrm");
    }
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[]): void {
    this.loggerService.log(`query is slow: ${query} ${this.stringifyParams(parameters)}`, "TypeOrm");
    this.loggerService.log(`execution time: ${time}`, "TypeOrm");
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string): void {
    if (this.options === "all" || (this.options instanceof Array && this.options.includes("schema"))) {
      this.loggerService.log(message, "TypeOrm");
    }
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string): void {
    this.loggerService.log(message, "TypeOrm");
  }

  /**
   * Perform logging using given logger, or by default to the this._logger.
   * Log has its own level and message.
   */
  log(level: "log" | "info" | "warn", message: unknown): void {
    switch (level) {
      case "log":
        if (this.options === "all" || (this.options instanceof Array && this.options.includes("log")))
          this.loggerService.log(message, "TypeOrm");
        break;
      case "info":
        if (this.options === "all" || (this.options instanceof Array && this.options.includes("info")))
          this.loggerService.log(message, "TypeOrm");
        break;
      case "warn":
        if (this.options === "all" || (this.options instanceof Array && this.options.includes("warn")))
          this.loggerService.warn(message, "TypeOrm");
        break;
    }
  }

  /**
   * Converts parameters to a string.
   * Sometimes parameters can have circular objects and therefor we are handle this case too.
   */
  protected stringifyParams(parameters: any[] = []): string {
    return parameters.length ? ` -- PARAMETERS: ${util.inspect(parameters)}` : "";
  }
}
