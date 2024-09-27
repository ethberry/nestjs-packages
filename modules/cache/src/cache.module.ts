import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { CacheModule, CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import redisStore from "cache-manager-ioredis";
import cacheManager from "cache-manager";

import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";
import { CACHE_STORE } from "./cache.constants";

@Module({
  imports: [
    LicenseModule.deferred(),
    CacheModule.registerAsync<CacheModuleAsyncOptions>({
      isGlobal: true, // this makes APP_INTERCEPTOR works in app.module
      imports: [ConfigModule],
      inject: [ConfigService, RedisService],
      useFactory: (configService: ConfigService, redisService: RedisService) => {
        return {
          ttl: configService.get<number>("CACHE_TTL", 3600),
          max: configService.get<number>("CACHE_MAX", 1000),
          store: cacheManager.caching({
            store: redisStore,
            redisInstance: redisService.getOrThrow(CACHE_STORE),
          }),
        };
      },
    }),
  ],
  providers: [licenseProvider],
})
export class EthBerryCacheModule {}
