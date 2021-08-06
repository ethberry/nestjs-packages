import { BaseExceptionFilter } from "@nestjs/core";
import { ArgumentsHost, Catch, InternalServerErrorException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcToHttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): any {
    return super.catch(new InternalServerErrorException(exception.message), host);
  }
}
