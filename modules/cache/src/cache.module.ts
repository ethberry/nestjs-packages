import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisManager } from "@liaoliaots/nestjs-redis";
import { CacheModule, CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { redisInsStore } from "cache-manager-ioredis-yet";

import { LicenseModule, licenseProvider } from "@gemunion/nest-js-module-license";

import { CACHE_STORE } from "./cache.constants";

@Module({
  imports: [
    LicenseModule.deferred(),
    CacheModule.registerAsync<CacheModuleAsyncOptions>({
      imports: [ConfigModule],
      inject: [ConfigService, RedisManager],
      useFactory: (configService: ConfigService, redisManager: RedisManager) => {
        return {
          ttl: configService.get<number>("CACHE_TTL", 3600),
          max: configService.get<number>("CACHE_MAX", 1000),
          store: redisInsStore(redisManager.getClient(CACHE_STORE)),
        };
      },
    }),
  ],
  providers: [licenseProvider],
})
export class GemunionCacheModule {}
