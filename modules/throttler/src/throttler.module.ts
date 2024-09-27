import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import type { ThrottlerModuleOptions } from "@nestjs/throttler";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { ThrottlerStorageRedisService } from "@nest-lab/throttler-storage-redis";

import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";

import { THROTTLE_STORE } from "./throttler.constants";

@Module({
  imports: [
    LicenseModule.deferred(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, RedisService],
      useFactory: (config: ConfigService, redisService: RedisService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: config.get<number>("THROTTLE_TTL", 3600000),
            limit: config.get<number>("THROTTLE_LIMIT", 1000),
          },
        ],
        storage: new ThrottlerStorageRedisService(redisService.getOrThrow(THROTTLE_STORE)),
      }),
    }),
  ],
  providers: [licenseProvider],
})
export class EthBerryThrottlerModule {}
