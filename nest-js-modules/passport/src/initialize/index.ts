import passport from "passport";

import { createModule } from "@gemunionstudio/nest-js-create-middleware-module";

export const PassportInitialize = createModule(() => {
  return passport.initialize();
});
