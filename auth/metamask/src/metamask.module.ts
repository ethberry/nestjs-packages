import { Module } from "@nestjs/common";

import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";

import { MetamaskService } from "./metamask.service";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [licenseProvider, MetamaskService],
  exports: [MetamaskService],
})
export class MetamaskModule {}
