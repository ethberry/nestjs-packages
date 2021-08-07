import { Controller, Get, Param } from "@nestjs/common";

import { Public } from "@gemunionstudio/nest-js-utils";

import { CoinGeckoService } from "./coin-gecko.service";

@Public()
@Controller("/coin-gecko")
export class CoinGeckoController {
  constructor(private readonly coinGeckoService: CoinGeckoService) {}

  @Get("/coin-list")
  public getCoinList(): Promise<any> {
    return this.coinGeckoService.getCoinList();
  }

  @Get("/coin-list/:symbol")
  public getCoin(@Param("symbol") symbol: string): Promise<any> {
    return this.coinGeckoService.getCoin(symbol);
  }

  @Get("/ohlc")
  public getOhlc(): Promise<any> {
    return this.coinGeckoService.getOhlc("bitcoin");
  }
}
