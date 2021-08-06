import passport from "passport";

import { createModule } from "@trejgun/nest-js-create-middleware-module";

export const PassportInitialize = createModule(() => {
  return passport.initialize();
});
