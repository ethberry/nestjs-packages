import {createConfigurableDynamicRootModule} from "@trejgun/nest-js-create-dynamic-module";
import {DynamicModule, HttpModule, Logger, Module} from "@nestjs/common";

import {MAILCHIMP_OPTIONS_PROVIDER} from "./mailchimp.constants";
import {MailchimpService} from "./mailchimp.service";
import {IMailchimpOptions} from "./interfaces";

@Module({
  imports: [HttpModule],
  providers: [Logger, MailchimpService],
  exports: [MailchimpModule, MailchimpService],
})
export class MailchimpModule extends createConfigurableDynamicRootModule<MailchimpModule, IMailchimpOptions>(
  MAILCHIMP_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => MailchimpModule.externallyConfigured(MailchimpModule, 0);
}
