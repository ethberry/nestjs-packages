import {BaseExceptionFilter} from "@nestjs/core";
import {ArgumentsHost, Catch, InternalServerErrorException} from "@nestjs/common";

@Catch(Error)
export class NativeToHttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): any {
    return super.catch(new InternalServerErrorException(exception.message), host);
  }
}
