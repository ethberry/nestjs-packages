import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";
import { URLSearchParams } from "url";
import { firstValueFrom } from "rxjs";

import type { ICoinGeckoCoin, ICoinGeckoCoinListItem, ICoinGeckoCoinTicker } from "@gemunion/types-coin-gecko";
import type { ISearchOhlc, ISearchRates } from "./interfaces";

// const baseUrl = "https://pro-api.coingecko.com/api/v3";
const baseUrl = "https://api.coingecko.com/api/v3";

@Injectable()
export class CoinGeckoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async coinList(): Promise<Array<ICoinGeckoCoinListItem>> {
    return this.sendRequest<Array<ICoinGeckoCoinListItem>>("/coins/list", { include_platform: true });
  }

  // https://www.coingecko.com/en/api/documentation#operations-coins-get_coins__id__tickers
  public async rates(dto: ISearchRates): Promise<ICoinGeckoCoinTicker | undefined> {
    const { baseCoinId, targetCoinId, exchangeIds } = dto;
    return this.sendRequest<ICoinGeckoCoin>(`/coins/${baseCoinId}`, {
      exchange_ids: exchangeIds,
    }).then(json => {
      return json.tickers.find(ticker => ticker.target === targetCoinId.toUpperCase());
    });
  }

  // https://www.coingecko.com/en/api/documentation#operations-coins-get_coins__id__ohlc
  public async ohlc(dto: ISearchOhlc): Promise<Array<Array<number>>> {
    const { baseCoinId, targetCoinId, days } = dto;
    return this.sendRequest<Array<Array<number>>>(`/coins/${baseCoinId}/ohlc`, {
      vs_currency: targetCoinId,
      days,
    });
  }

  private getSearchParams(dto: Record<string, any>): string {
    const search = new URLSearchParams("");
    Object.keys(dto).forEach(key => {
      search.append(key, Array.isArray(dto[key]) ? dto[key].join(",") : dto[key].toString());
    });

    return search.toString();
  }

  private sendRequest<T>(url: string, params: Record<string, any>): Promise<T> {
    const apiKey = this.configService.get<string>("COIN_GECKO_API_KEY", "");

    Object.assign(params, {
      x_cg_pro_api_key: apiKey,
    });

    const response = this.httpService
      .request({
        url: `${baseUrl}${url}?${this.getSearchParams(params)}`,
      })
      .pipe(map((response: { data: T }) => response.data));

    return firstValueFrom(response);
  }
}
