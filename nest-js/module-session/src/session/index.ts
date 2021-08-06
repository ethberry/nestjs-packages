import session from "express-session";
import connectRedis from "connect-redis";
import { Redis } from "ioredis";

import { createModule } from "@trejgun/nest-js-create-middleware-module";

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
    store: new (connectRedis(session))({ client }),
    saveUninitialized: true,
    proxy: true,
  });
});
