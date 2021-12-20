import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Cron, CronExpression } from "@nestjs/schedule";
import { map } from "rxjs/operators";

import { LICENSE_KEY } from "./license.constants";
import { ILicense, LicenseStatus } from "./license.interface";

@Injectable()
export class LicenseService {
  private license: ILicense | undefined;

  constructor(
    @Inject(LICENSE_KEY)
    private readonly licenseKey: string,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async updateLicence(): Promise<void> {
    this.license = await this.httpService
      .get<ILicense>(`https://license.gemunion.com/${this.licenseKey}`)
      .pipe(map(response => response.data))
      .toPromise()
      .catch(() => void 0);
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
      this.showInvalidLicenseError();
      return false;
    }

    return true;
  }

  private showError(message: Array<string>) {
    this.loggerService.error(
      [
        "************************************************************",
        "*************************************************************",
        "",
        ...message,
        "Please visit https://gemunion.io/ to get a valid licenseKey.",
        "",
        "*************************************************************",
        "*************************************************************",
      ].join("\n"),
    );
  }

  private showInvalidLicenseError(): void {
    // prettier-ignore
    this.showError([
      "Gemunion Studio: Invalid licenseKey.",
      "",
      "Your licenseKey for Gemunion Framework is not valid"
    ]);
  }

  private showNotFoundLicenseError(): void {
    // prettier-ignore
    this.showError([
      "Gemunion Studio: License key not found.",
      "",
      "You did not enter a licenseKey",
    ]);
  }

  private showExpiredLicenseError(): void {
    // prettier-ignore
    this.showError([
      "Gemunion Studio: License key expired.",
      "",
      "Your subscription for Gemunion Framework has expired.",
    ]);
  }
}
