import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";

import { NotFoundInterceptor, Public } from "@ethberry/nest-js-utils";
import type { ICoinGeckoCoinTicker } from "@ethberry/types-coin-gecko";

import { SearchOhlc, SearchRates } from "./dto";
import { CoinGeckoService } from "./coin-gecko.service";

@Public()
@Controller("/coin-gecko")
export class CoinGeckoController {
  constructor(private readonly coinGeckoService: CoinGeckoService) {}

  @Get("/rates")
  @UseInterceptors(NotFoundInterceptor)
  public rates(@Query() dto: SearchRates): Promise<ICoinGeckoCoinTicker | undefined> {
    return this.coinGeckoService.rates(dto);
  }

  @Get("/ohlc")
  public ohlc(@Query() dto: SearchOhlc): Promise<Array<Array<number>>> {
    return this.coinGeckoService.ohlc(dto);
  }
}
