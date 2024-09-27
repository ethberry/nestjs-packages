import passport from "passport";

import { createModule } from "@ethberry/nest-js-create-middleware-module";

export const PassportInitialize = createModule(() => {
  return passport.initialize();
});
