import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";

import { ICmcQuote, ICmcResponse } from "@gemunion/types-coin-market-cap";

import { ISearchOhlc, ISearchRates } from "./interfaces";

const baseUrl = "https://pro-api.coinmarketcap.com/v1";

@Injectable()
export class CoinMarketCapService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  public rates(dto: ISearchRates): Promise<ICmcQuote | undefined> {
    const { baseCoinId, targetCoinId, start = 1, limit = 10 } = dto;
    const url = `/cryptocurrency/listings/latest`;
    return this.sendRequest<ICmcResponse>(url, { start, limit, convert: targetCoinId }).then(json => {
      return json.data.find(data => data.symbol === baseCoinId)?.quote[targetCoinId];
    });
  }

  // https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyOhlcvHistorical
  public async ohlc(dto: ISearchOhlc): Promise<Array<Array<number>>> {
    const { baseCoinId } = dto;
    return this.sendRequest<Array<Array<number>>>("/cryptocurrency/ohlcv/historical", {
      symbol: baseCoinId,
    });
  }

  private sendRequest<T>(url: string, params: Record<string, any>): Promise<T> {
    const apiKey = this.configService.get<string>("COIN_MARKET_CAP_API_KEY", "");
    const response = this.httpService
      .request({
        url: `${baseUrl}${url}`,
        params,
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
      })
      .pipe(map((response: { data: T }) => response.data));

    return firstValueFrom(response);
  }
}
