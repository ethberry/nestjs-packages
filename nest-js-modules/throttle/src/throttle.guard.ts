import { Injectable } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class GemunionThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(): void {
    throw new ThrottlerException("tooManyRequests");
  }
}
