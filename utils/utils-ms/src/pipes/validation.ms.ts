import { Injectable, ValidationError, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class MsValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      exceptionFactory: (errors: Array<ValidationError>): RpcException => new RpcException(errors),
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      ...options,
    });
  }
}
