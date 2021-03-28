import sts from "strict-transport-security";

import {createModule} from "@trejgun/nest-js-create-middleware-module";

interface IHstsOptions {
  maxAge?: number;
}

export const HstsModule = createModule<IHstsOptions>(options => {
  const {maxAge = 30 * 24 * 60 * 60} = options;
  return sts.getSTS({
    "max-age": maxAge,
    includeSubDomains: true,
  });
});
