import { Injectable, ExecutionContext } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class WsThrottlerGuard extends ThrottlerGuard {
  async handleRequest(context: ExecutionContext, limit: number, ttl: number): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const ip = ["conn", "_socket"]
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .map(key => client[key])
      .filter(obj => obj)
      .shift().remoteAddress;
    const key = this.generateKey(context, ip);
    const ttls = await this.storageService.getRecord(key);

    if (ttls.length >= limit) {
      this.throwThrottlingException();
    }

    await this.storageService.addRecord(key, ttl);
    return true;
  }

  protected throwThrottlingException(): void {
    throw new WsException("tooManyRequests");
  }
}
