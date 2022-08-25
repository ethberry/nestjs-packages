import { DynamicModule, Logger, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { LicenseModule, licenseProvider } from "@gemunion/nest-js-module-license";

import { MAILCHIMP_OPTIONS_PROVIDER } from "./mailchimp.constants";
import { MailchimpService } from "./mailchimp.service";
import { IMailchimpOptions } from "./interfaces";

@Module({
  imports: [LicenseModule.deferred(), HttpModule],
  providers: [Logger, licenseProvider, MailchimpService],
  exports: [MailchimpService],
})
export class MailchimpModule extends createConfigurableDynamicRootModule<MailchimpModule, IMailchimpOptions>(
  MAILCHIMP_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => MailchimpModule.externallyConfigured(MailchimpModule, 0);
}
