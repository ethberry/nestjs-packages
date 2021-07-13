import {BaseExceptionFilter} from "@nestjs/core";
import {
  ArgumentsHost,
  Catch,
  HttpException,
  Inject,
  InternalServerErrorException,
  Logger,
  LoggerService,
  NotFoundException,
} from "@nestjs/common";

@Catch(Error)
export class HttpExceptionFilter extends BaseExceptionFilter {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
  ) {
    super();
  }

  catch(exception: Error, host: ArgumentsHost): any {
    if (exception instanceof HttpException) {
      if (exception instanceof NotFoundException) {
        if (exception.message.startsWith("Cannot")) {
          const error = new NotFoundException("pageNotFound");
          const res = host.switchToHttp().getResponse();
          // header with status code 404 already sent
          res.json(error.getResponse());
          return;
        }
      }
      return super.catch(exception, host);
    }
    this.loggerService.error(exception);
    return super.catch(new InternalServerErrorException("internalServerError"), host);
  }
}
