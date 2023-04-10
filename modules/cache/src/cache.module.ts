import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisManager } from "@liaoliaots/nestjs-redis";

import { CacheInterceptor, CacheModule, CacheModuleAsyncOptions } from "@nestjs/cache-manager";
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
          store: redisInsStore(redisManager.getClient(CACHE_STORE)),
        };
      },
    }),
  ],
  providers: [
    licenseProvider,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class GemunionCacheModule {}
