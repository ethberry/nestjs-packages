import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";
import { URLSearchParams } from "url";
import { firstValueFrom } from "rxjs";

import { ICoinGeckoCoin, ICoinGeckoCoinListItem } from "@gemunion/types-coin-gecko";

@Injectable()
export class CoinGeckoService {
  constructor(private readonly httpService: HttpService) {}

  public async getCoinList(): Promise<Array<ICoinGeckoCoinListItem>> {
    return this.sendRequest<Array<ICoinGeckoCoinListItem>>(`coins/list`, { include_platform: true });
  }

  public async getOhlc(symbol: string): Promise<Array<Array<number>>> {
    return this.sendRequest<Array<Array<number>>>(`/coins/${symbol}/ohlc`, { vs_currency: "usd", days: 1 });
  }

  public async getCoin(symbol: string): Promise<ICoinGeckoCoin> {
    return this.sendRequest<ICoinGeckoCoin>(`/coins/${symbol}`, {});
  }

  private getSearchParams(dto: Record<string, any>): string {
    const search = new URLSearchParams("");
    Object.keys(dto).forEach(key => {
      search.append(key, Array.isArray(dto[key]) ? dto[key].join(",") : dto[key].toString());
    });

    return search.toString();
  }

  private sendRequest<T>(url: string, data: Record<string, any>): Promise<T> {
    const response = this.httpService
      .request({
        url: `https://api.coingecko.com/api/v/${url}?${this.getSearchParams(data)}`,
      })
      .pipe(map((response: { data: T }) => response.data));

    return firstValueFrom(response);
  }
}
