import session from "express-session";
import connectRedis from "connect-redis";

import {createModule} from "@trejgun/nest-js-create-middleware-module";
import {createRedisClient} from "@trejgun/redis";

export interface ISessionOptions {
  url: string;
  secret: string;
  maxAge?: number;
  name?: string;
}

export const SessionModule = createModule<ISessionOptions>(options => {
  const {url, secret, name = "sid", maxAge = 30 * 24 * 60 * 60} = options;
  return session({
    cookie: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: maxAge * 1000,
      signed: false,
      sameSite: "none",
    },
    name,
    resave: false,
    secret,
    store: new (connectRedis(session))({client: createRedisClient(url)}),
    saveUninitialized: true,
    proxy: true,
  });
});
