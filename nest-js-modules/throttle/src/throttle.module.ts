import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { RedisModule, RedisManager } from "@liaoliaots/nestjs-redis";
import { ThrottlerStorageRedisService } from "nestjs-throttler-storage-redis";

import { THROTTLE_STORE } from "./throttle.constants";
import { GemunionThrottlerGuard } from "./throttle.guard";

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: GemunionThrottlerGuard,
    },
  ],
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule, RedisModule],
      inject: [ConfigService, RedisManager],
      useFactory: (config: ConfigService, redisManager: RedisManager) => ({
        ttl: config.get<number>("THROTTLE_TTL", 3600),
        limit: config.get<number>("THROTTLE_LIMIT", 1000),
        storage: new ThrottlerStorageRedisService(redisManager.getClient(THROTTLE_STORE)),
      }),
    }),
  ],
})
export class ThrottleModule {}
