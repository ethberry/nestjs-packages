import { CanActivate, Injectable, InternalServerErrorException } from "@nestjs/common";
import { LicenseService } from "./license.service";

@Injectable()
export class LicenseGuard implements CanActivate {
  constructor(private readonly licenseService: LicenseService) {}

  canActivate(): boolean {
    if (this.licenseService.isValid()) {
      return true;
    }

    throw new InternalServerErrorException();
  }
}
