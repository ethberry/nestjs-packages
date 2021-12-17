import { SetMetadata } from "@nestjs/common";

export const RequireLicense = (): ((target: any, key?: any, descriptor?: any) => any) =>
  SetMetadata("require_license", true);
