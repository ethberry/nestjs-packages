import {createConfigurableDynamicRootModule} from "@trejgun/nest-js-create-dynamic-module";
import {HttpModule, Logger, Module} from "@nestjs/common";

import {ProviderType} from "./mailchimp.constants";
import {MailchimpService} from "./mailchimp.service";
import {IMailchimpOptions} from "./interfaces";

@Module({
  imports: [HttpModule],
  providers: [Logger, MailchimpService],
  exports: [MailchimpModule, MailchimpService],
})
export class MailchimpModule extends createConfigurableDynamicRootModule<MailchimpModule, IMailchimpOptions>(
  ProviderType.MAILCHIMP_OPTIONS,
) {
  static Deferred = MailchimpModule.externallyConfigured(MailchimpModule, 1000);
}
