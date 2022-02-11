import { Controller, Get, Param } from "@nestjs/common";

import { Public } from "@gemunion/nest-js-utils";

import { CoinGeckoService } from "./coin-gecko.service";

@Public()
@Controller("/coin-gecko")
export class CoinGeckoController {
  constructor(private readonly coinGeckoService: CoinGeckoService) {}

  @Get("/coins/list")
  public getCoinList(): Promise<any> {
    return this.coinGeckoService.getCoinList();
  }

  @Get("/coins/:symbol")
  public getCoin(@Param("symbol") symbol: string): Promise<any> {
    return this.coinGeckoService.getCoin(symbol);
  }

  @Get("/coins/:symbol/ticker")
  public getTicker(@Param("symbol") symbol: string): Promise<any> {
    return this.coinGeckoService.getTicker(symbol);
  }

  @Get("/ohlc")
  public getOhlc(): Promise<any> {
    return this.coinGeckoService.getOhlc("bitcoin");
  }
}
