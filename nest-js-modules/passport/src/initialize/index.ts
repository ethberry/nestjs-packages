import passport from "passport";

import { createModule } from "@gemunion/nest-js-create-middleware-module";

export const PassportInitialize = createModule(() => {
  return passport.initialize();
});
