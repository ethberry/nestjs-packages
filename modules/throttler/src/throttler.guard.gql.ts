import { Injectable, ExecutionContext } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerException } from "@nestjs/throttler";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.res };
  }

  protected throwThrottlingException(): Promise<void> {
    throw new ThrottlerException("tooManyRequests");
  }
}
