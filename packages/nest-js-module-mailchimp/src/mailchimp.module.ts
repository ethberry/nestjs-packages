import {createConfigurableDynamicRootModule} from "@golevelup/nestjs-modules";
import {Module} from "@nestjs/common";

import {ProviderType} from "./mailchimp.constants";
import {MailchimpService} from "./mailchimp.service";
import {IMailchimpOptions} from "./interfaces";

@Module({
  providers: [MailchimpService],
  exports: [S3Module, MailchimpService],
})
export class S3Module extends createConfigurableDynamicRootModule<S3Module, IMailchimpOptions>(
  ProviderType.MAILCHIMP_OPTIONS,
) {
  static Deferred = S3Module.externallyConfigured(S3Module, 1000);
}
