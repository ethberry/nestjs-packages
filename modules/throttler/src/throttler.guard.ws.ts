import { Injectable, ExecutionContext } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerException } from "@nestjs/throttler";
import { ThrottlerOptions } from "@nestjs/throttler/dist/throttler-module-options.interface";

@Injectable()
export class WsThrottlerGuard extends ThrottlerGuard {
  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
    throttler: ThrottlerOptions,
  ): Promise<boolean> {
    const { req } = this.getRequestResponse(context);
    const tracker = await this.getTracker(req);
    const key = this.generateKey(context, tracker, throttler.name || "default");
    const { totalHits } = await this.storageService.increment(key, ttl);

    if (totalHits > limit) {
      void this.throwThrottlingException();
    }

    return true;
  }

  protected throwThrottlingException(): Promise<void> {
    throw new ThrottlerException("tooManyRequests");
  }
}
