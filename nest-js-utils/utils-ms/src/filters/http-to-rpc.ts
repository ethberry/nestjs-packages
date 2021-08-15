import { Catch, HttpException } from "@nestjs/common";
import { BaseRpcExceptionFilter, RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";

@Catch(HttpException)
export class HttpToRpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: HttpException): Observable<any> {
    return throwError(new RpcException(exception.message));
  }
}
