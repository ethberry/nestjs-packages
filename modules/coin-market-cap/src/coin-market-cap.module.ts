import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";

import { CoinMarketCapService } from "./coin-market-cap.service";
import { CoinMarketCapController } from "./coin-market-cap.controller";

@Module({
  imports: [LicenseModule.deferred(), ConfigModule, HttpModule],
  providers: [licenseProvider, CoinMarketCapService],
  controllers: [CoinMarketCapController],
  exports: [CoinMarketCapService],
})
export class CoinMarketCapModule {}
