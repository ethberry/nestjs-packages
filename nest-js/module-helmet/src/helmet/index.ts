import helmet from "helmet";

import { createModule } from "@gemunionstudio/nest-js-create-middleware-module";

// https://github.com/helmetjs/helmet/issues/279
// https://github.com/helmetjs/helmet/issues/271

export const HelmetModule = createModule<any>(options => {
  return helmet(options);
});
