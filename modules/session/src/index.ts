import session from "express-session";
import RedisStore from "connect-redis";
import { Redis } from "ioredis";

import { createModule } from "@ethberry/nest-js-create-middleware-module";

export interface ISessionOptions {
  secret: string;
  secure: boolean;
  maxAge?: number;
  name?: string;
  client: Redis;
}

export const SessionModule = createModule<ISessionOptions>(options => {
  const { client, secret, secure, name = "sid", maxAge = 30 * 24 * 60 * 60 } = options;
  return session({
    cookie: {
      path: "/",
      httpOnly: true,
      secure,
      maxAge: maxAge * 1000,
      signed: false,
      sameSite: secure ? "none" : "lax",
    },
    name,
    resave: false,
    secret,
    store: new RedisStore({ client }),
    saveUninitialized: true,
    proxy: true,
  });
});
