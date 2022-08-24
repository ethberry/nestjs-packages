import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";

import { NotFoundInterceptor, Public } from "@gemunion/nest-js-utils";
import { ICmcQuote } from "@gemunion/types-coin-market-cap";

import { CoinMarketCapService } from "./coin-market-cap.service";
import { SearchRates } from "./dto";

@Public()
@Controller("/coin-market-cap")
export class CoinMarketCapController {
  constructor(private readonly cmcService: CoinMarketCapService) {}

  @Get("/rates")
  @UseInterceptors(NotFoundInterceptor)
  public rates(@Query() dto: SearchRates): Promise<ICmcQuote | undefined> {
    return this.cmcService.rates(dto);
  }
}
