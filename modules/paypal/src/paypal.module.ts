import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";

import { PayPalService } from "./paypal.service";

@Module({
  imports: [LicenseModule.deferred(), ConfigModule, HttpModule],
  providers: [Logger, licenseProvider],
  exports: [PayPalService],
})
export class PayPalModule {}
