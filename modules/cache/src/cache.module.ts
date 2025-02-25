import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisManager } from "@liaoliaots/nestjs-redis";
import { CacheModule, CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import redisStore from "cache-manager-ioredis";
import { caching } from "cache-manager";

import { CACHE_STORE } from "./cache.constants";

@Module({
  imports: [
    CacheModule.registerAsync<CacheModuleAsyncOptions>({
      isGlobal: true, // this makes APP_INTERCEPTOR works in app.module
      imports: [ConfigModule],
      inject: [ConfigService, RedisManager],
      useFactory: (configService: ConfigService, redisManager: RedisManager) => {
        return {
          ttl: configService.get<number>("CACHE_TTL", 3600),
          max: configService.get<number>("CACHE_MAX", 1000),
          store: caching({
            store: redisStore,
            redisInstance: redisManager.getClient(CACHE_STORE),
          }),
        };
      },
    }),
  ],
})
export class EthBerryCacheModule {}
