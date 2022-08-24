import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";

import { ICmcQuote, ICmcResponse } from "@gemunion/types-coin-market-cap";

import { ISearchRates } from "./interfaces";

@Injectable()
export class CoinMarketCapService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  public rates(dto: ISearchRates): Promise<ICmcQuote | undefined> {
    const { baseCoinId, targetCoinId, start = 1, limit = 10 } = dto;
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    return this.sendRequest<ICmcResponse>(url, { start, limit, convert: targetCoinId }).then(json => {
      return json.data.find(data => data.symbol === baseCoinId)?.quote[targetCoinId];
    });
  }

  private sendRequest<T>(url: string, params: Record<string, any>): Promise<T> {
    const cmcKey = this.configService.get<string>("CMC_PRO_API_KEY", "");

    const response = this.httpService
      .request({
        url,
        params,
        headers: {
          "X-CMC_PRO_API_KEY": cmcKey,
        },
      })
      .pipe(map((response: { data: T }) => response.data));

    return firstValueFrom(response);
  }
}
