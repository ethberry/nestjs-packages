import { Injectable, ExecutionContext } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerException } from "@nestjs/throttler";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext): {
    req: Record<string, any>;
    res: Record<string, any>;
  } {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.res }; // ctx.request and ctx.reply for fastify
  }

  protected throwThrottlingException(): void {
    throw new ThrottlerException("tooManyRequests");
  }
}
