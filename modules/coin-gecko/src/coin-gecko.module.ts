import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { LicenseModule, licenseProvider } from "@gemunion/nest-js-module-license";

import { CoinGeckoService } from "./coin-gecko.service";
// import { CoinGeckoController } from "./coin-gecko.controller";

@Module({
  imports: [LicenseModule.deferred(), HttpModule],
  providers: [licenseProvider, CoinGeckoService],
  // controllers: [CoinGeckoController],
  exports: [CoinGeckoService],
})
export class CoinGeckoModule {}
