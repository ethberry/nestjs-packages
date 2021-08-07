import { createConfigurableDynamicRootModule } from "@gemunionstudio/nest-js-create-dynamic-module";
import { DynamicModule, Logger, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { MAILCHIMP_OPTIONS_PROVIDER } from "./mailchimp.constants";
import { MailchimpService } from "./mailchimp.service";
import { IMailchimpOptions } from "./interfaces";

@Module({
  imports: [HttpModule],
  providers: [Logger, MailchimpService],
  exports: [MailchimpService],
})
export class MailchimpModule extends createConfigurableDynamicRootModule<MailchimpModule, IMailchimpOptions>(
  MAILCHIMP_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => MailchimpModule.externallyConfigured(MailchimpModule, 0);
}
