import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { CoinGeckoService } from "./coin-gecko.service";
// import { CoinGeckoController } from "./coin-gecko.controller";

@Module({
  imports: [HttpModule],
  providers: [CoinGeckoService],
  // controllers: [CoinGeckoController],
  exports: [CoinGeckoService],
})
export class CoinGeckoModule {}
