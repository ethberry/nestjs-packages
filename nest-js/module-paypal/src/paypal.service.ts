import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";

import { IPayPalJwt, IPlan } from "./interfaces";

@Injectable()
export class PayPalService {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  // https://developer.paypal.com/docs/api/payments.billing-plans/v1/#billing-plans_get
  public async getPlanByRef(ref: string): Promise<IPlan> {
    const jwt = await this.getAccessToken();

    const response = this.httpService
      .request({
        url: `https://api.paypal.com/v1/billing/plans/${ref}`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.access_token}`,
        },
      })
      .pipe(map((response: { data: IPlan }) => response.data));

    return firstValueFrom(response);
  }

  // https://developer.paypal.com/docs/business/get-started/#step-result
  public getAccessToken(): Promise<IPayPalJwt> {
    const payPalClientId = this.configService.get<string>("PAYPAL_CLIENT_ID", "");
    const payPalClientSecret = this.configService.get<string>("PAYPAL_CLIENT_SECRET", "");

    const response = this.httpService
      .request({
        url: "https://api.paypal.com/v1/oauth2/token",
        method: "post",
        headers: {
          "Accept-Language": "en_US",
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        auth: {
          username: payPalClientId,
          password: payPalClientSecret,
        },
        data: "grant_type=client_credentials",
      })
      .pipe(map((response: { data: IPayPalJwt }) => response.data));

    return firstValueFrom(response);
  }
}
