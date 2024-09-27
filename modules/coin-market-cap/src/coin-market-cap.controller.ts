import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";

import { NotFoundInterceptor, Public } from "@ethberry/nest-js-utils";
import { ICmcQuote } from "@ethberry/types-coin-market-cap";

import { CoinMarketCapService } from "./coin-market-cap.service";
import { SearchRates, SearchOhlc } from "./dto";

@Public()
@Controller("/coin-market-cap")
export class CoinMarketCapController {
  constructor(private readonly coinMarketCapService: CoinMarketCapService) {}

  @Get("/rates")
  @UseInterceptors(NotFoundInterceptor)
  public rates(@Query() dto: SearchRates): Promise<ICmcQuote | undefined> {
    return this.coinMarketCapService.rates(dto);
  }

  @Get("/ohlc")
  public ohlc(@Query() dto: SearchOhlc): Promise<any> {
    return this.coinMarketCapService.ohlc(dto);
  }
}
