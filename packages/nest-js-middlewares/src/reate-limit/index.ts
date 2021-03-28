import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

import {createModule} from "@trejgun/nest-js-create-middleware-module";
import {createRedisClient} from "@trejgun/redis";

export interface IRateLimitOptions {
  url: string;
  maxAge?: number;
  max?: number;
}

export const RateLimitModule = createModule<IRateLimitOptions>(options => {
  const {url, maxAge = 60 * 60, max = 200} = options; // 200 requests per hour from one ip
  return rateLimit({
    store: new RedisStore({
      client: createRedisClient(url),
      expiry: maxAge,
    }),
    windowMs: maxAge * 1000,
    max: process.env.NODE_ENV === "development" ? 0 : max,
  });
});
