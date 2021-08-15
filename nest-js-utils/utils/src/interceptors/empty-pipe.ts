import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ExecutionContext, Injectable, NestInterceptor, NotFoundException, CallHandler } from "@nestjs/common";

@Injectable()
export class EmptyPipeInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    let isEmptyPipe = true;
    return next.handle().pipe(
      tap(
        () => {
          isEmptyPipe = false;
        },
        void 0,
        () => {
          if (isEmptyPipe) {
            throw new NotFoundException();
          }
        },
      ),
    );
  }
}
