import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { CoinGeckoService } from "./coin-gecko.service";
import { CoinGeckoController } from "./coin-gecko.controller";

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [CoinGeckoService],
  controllers: [CoinGeckoController],
  exports: [CoinGeckoService],
})
export class CoinGeckoModule {}
