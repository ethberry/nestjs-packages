import { Controller, Get } from "@nestjs/common";

import { Public } from "@gemunion/nest-js-utils";

import { CmcService } from "./cmc.service";
import { ICmcQuote } from "./interfaces";

@Public()
@Controller("/cmc")
export class CmcController {
  constructor(private readonly cmcService: CmcService) {}

  @Get("/get-price")
  public getPrice(): Promise<ICmcQuote> {
    return this.cmcService.getPrice("USD");
  }
}
