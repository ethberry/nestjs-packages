import {Catch} from "@nestjs/common";
import {BaseRpcExceptionFilter, RpcException} from "@nestjs/microservices";
import {Observable, throwError} from "rxjs";

@Catch(Error)
export class NativeToRpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: Error): Observable<any> {
    return throwError(new RpcException(exception.message));
  }
}
