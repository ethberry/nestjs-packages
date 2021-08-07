import { RequestHandler } from "express";
import passport from "passport";

import { createModule } from "@gemunionstudio/nest-js-create-middleware-module";

export const PassportSession = createModule(() => {
  return passport.session() as RequestHandler;
});
