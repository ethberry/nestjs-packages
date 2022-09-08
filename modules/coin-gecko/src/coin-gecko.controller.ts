import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";

import { NotFoundInterceptor, Public } from "@gemunion/nest-js-utils";

import { SearchOhlc, SearchRates } from "./dto";
import { CoinGeckoService } from "./coin-gecko.service";

@Public()
@Controller("/coin-gecko")
export class CoinGeckoController {
  constructor(private readonly coinGeckoService: CoinGeckoService) {}

  @Get("/rates")
  @UseInterceptors(NotFoundInterceptor)
  public rates(@Query() dto: SearchRates): Promise<any | undefined> {
    return this.coinGeckoService.rates(dto);
  }

  @Get("/ohlc")
  public ohlc(@Query() dto: SearchOhlc): Promise<any> {
    return this.coinGeckoService.ohlc(dto);
  }
}
