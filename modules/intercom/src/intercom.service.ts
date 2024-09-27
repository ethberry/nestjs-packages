import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";

import { INTERCOM_OPTIONS_PROVIDER } from "./intercom.constants";
import { IIntercomOptions } from "./interfaces";

@Injectable()
export class IntercomService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(INTERCOM_OPTIONS_PROVIDER)
    _options: IIntercomOptions,
  ) {}

  public async addToContactList(userEntity: Record<string, string>): Promise<any> {
    return this.sendRequest("/contacts", {
      role: "user",
      external_id: userEntity.id,
      email: userEntity.email,
      name: `${userEntity.firstName} ${userEntity.lastName}`,
    }).catch(e => {
      // most likely duplicate
      this.loggerService.log(`Failed to add to intercom ${userEntity.email}`);
      this.loggerService.error(e.message, e.stack, IntercomService.name);
    });
  }

  private sendRequest<T>(url: string, data: any): Promise<T> {
    const token = this.configService.get<string>("INTERCOM_TOKEN", "");

    const response = this.httpService
      .request({
        method: "post",
        url: `https://api.intercom.io${url}`,
        data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      .pipe(map((response: { data: T }) => response.data));

    return firstValueFrom(response);
  }
}
