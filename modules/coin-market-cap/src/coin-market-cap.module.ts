import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { CoinMarketCapService } from "./coin-market-cap.service";
import { CoinMarketCapController } from "./coin-market-cap.controller";

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [CoinMarketCapService],
  controllers: [CoinMarketCapController],
  exports: [CoinMarketCapService],
})
export class CoinMarketCapModule {}
