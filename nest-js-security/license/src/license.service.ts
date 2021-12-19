import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Cron, CronExpression } from "@nestjs/schedule";
import { map } from "rxjs/operators";

import { NS } from "./license.constants";
import { ILicense } from "./license.interface";

@Injectable()
export class LicenseService {
  private isValid = true;

  constructor(
    @Inject(NS)
    private readonly ns: string,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateLicence(): Promise<void> {
    const license = await this.httpService
      .get<ILicense>(`https://license.gemunion.com/api/v1/?ns=${this.ns}`)
      .pipe(map(response => response.data))
      .toPromise();
    this.isValid = !!license?.success;
  }

  public checkLicence(): boolean {
    return this.isValid;
  }
}
