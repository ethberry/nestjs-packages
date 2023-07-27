import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";
import { URLSearchParams } from "url";

import { IIexBatch, IIexSymbol } from "@gemunion/types-iex-cloud";

import { IBatchDto } from "./interfaces";

@Injectable()
export class IexCloudService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async exchangeRequest(exchange: string): Promise<Array<IIexSymbol>> {
    return this.sendRequest<Array<IIexSymbol>>(`/ref-data/exchange/${exchange}/symbols`, {});
  }

  public batch(dto: IBatchDto): Promise<IIexBatch> {
    return this.sendRequest<IIexBatch>("/stock/market/batch", dto);
  }

  private getSearchParams(dto: Record<string, any>): string {
    const token = this.configService.get<string>("IEXCLOUD_PRIVATE_KEY", "");

    const search = new URLSearchParams("");
    Object.keys(dto).forEach(key => {
      search.append(key, Array.isArray(dto[key]) ? dto[key].join(",") : dto[key].toString());
    });

    search.append("format", "json");
    search.append("token", token);

    return search.toString();
  }

  private sendRequest<T>(url: string, data: Record<string, any>): Promise<T> {
    const response = this.httpService
      .request({
        url: `https://cloud.iexapis.com/stable${url}?${this.getSearchParams(data)}`,
      })
      .pipe(map((response: { data: T }) => response.data));

    return firstValueFrom(response);
  }
}
