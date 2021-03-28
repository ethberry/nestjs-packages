import {NextFunction, Request, Response} from "express";
import {Inject, Logger, LoggerService, Module} from "@nestjs/common";
import {MiddlewareConsumer} from "@nestjs/common/interfaces";

@Module({
  providers: [Logger],
})
export class LoggerModule {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, _res: Response, next: NextFunction): void => {
        this.loggerService.log(`${req.method} ${req.url}`, LoggerModule.name);
        next();
      })
      .forRoutes("/");
  }
}
