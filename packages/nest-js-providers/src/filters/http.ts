import {BaseExceptionFilter} from "@nestjs/core";
import {ArgumentsHost, Catch, HttpException} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    return super.catch(exception, host);
  }
}
