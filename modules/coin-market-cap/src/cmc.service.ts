import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";

import { ICmcQuote, ICmcResponse } from "./interfaces";

@Injectable()
export class CmcService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  public getPrice(ticker: string): Promise<ICmcQuote> {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    return this.sendRequest<ICmcResponse>(url, {}).then(json => {
      // 0 - btc, 1 - eth
      return json.data[1].quote[ticker];
    });
  }

  private sendRequest<T>(url: string, _data: Record<string, any>): Promise<T> {
    const cmcKey = this.configService.get<string>("CMC_PRO_API_KEY", "");
    const response = this.httpService
      .request({
        url,
        headers: {
          "X-CMC_PRO_API_KEY": cmcKey,
        },
      })
      .pipe(map((response: { data: T }) => response.data));

    return firstValueFrom(response);
  }
}
