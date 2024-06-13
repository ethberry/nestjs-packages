import { Module } from "@nestjs/common";

import { LicenseModule, licenseProvider } from "@gemunion/nest-js-module-license";

import { WalletConnectService } from "./wallet-connect.service";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [licenseProvider, WalletConnectService],
  exports: [WalletConnectService],
})
export class WalletConnectModule {}
