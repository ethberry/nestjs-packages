import { Injectable, ExecutionContext } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerException } from "@nestjs/throttler";
import type { ThrottlerOptions } from "@nestjs/throttler";

@Injectable()
export class WsThrottlerGuard extends ThrottlerGuard {
  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
    throttler: ThrottlerOptions,
  ): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const ip = client._socket.remoteAddress;
    const key = this.generateKey(context, ip, throttler.name || "default");
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
