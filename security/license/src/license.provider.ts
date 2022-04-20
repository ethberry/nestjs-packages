import { APP_GUARD } from "@nestjs/core";

import { LicenseGuard } from "./license.guard";

export const licenseProvider = {
  provide: APP_GUARD,
  useClass: LicenseGuard,
};
