import { DynamicModule, Logger, Module } from "@nestjs/common";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";

import { MAILJET_OPTIONS_PROVIDER } from "./mailjet.constants";
import { MailjetService } from "./mailjet.service";
import { IMailjetOptions } from "./interfaces";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [licenseProvider, Logger, MailjetService],
  exports: [MailjetService],
})
export class MailjetModule extends createConfigurableDynamicRootModule<MailjetModule, IMailjetOptions>(
  MAILJET_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => MailjetModule.externallyConfigured(MailjetModule, 0);
}
