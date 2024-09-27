import helmet, { HelmetOptions } from "helmet";

import { createModule } from "@ethberry/nest-js-create-middleware-module";

export const HelmetModule = createModule<HelmetOptions>(helmet);
