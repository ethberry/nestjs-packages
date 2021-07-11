import {createConfigurableDynamicRootModule} from "@golevelup/nestjs-modules";
import {Module} from "@nestjs/common";

import {ProviderType} from "./mailchimp.constants";
import {MailchimpService} from "./mailchimp.service";
import {IMailchimpOptions} from "./interfaces";

@Module({
  providers: [MailchimpService],
  exports: [MailchimpModule, MailchimpService],
})
export class MailchimpModule extends createConfigurableDynamicRootModule<MailchimpModule, IMailchimpOptions>(
  ProviderType.MAILCHIMP_OPTIONS,
) {
  static Deferred = MailchimpModule.externallyConfigured(MailchimpModule, 1000);
}
