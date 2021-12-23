import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { RedisManager } from "@liaoliaots/nestjs-redis";
import { ThrottlerStorageRedisService } from "nestjs-throttler-storage-redis";

import { LicenseGuard, LicenseModule } from "@gemunion/nest-js-module-license";

import { THROTTLE_STORE } from "./throttler.constants";

@Module({
  imports: [
    LicenseModule.deferred(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, RedisManager],
      useFactory: (config: ConfigService, redisManager: RedisManager) => ({
        ttl: config.get<number>("THROTTLE_TTL", 3600),
        limit: config.get<number>("THROTTLE_LIMIT", 1000),
        storage: new ThrottlerStorageRedisService(redisManager.getClient(THROTTLE_STORE)),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LicenseGuard,
    },
  ],
})
export class GemunionThrottlerModule {}
