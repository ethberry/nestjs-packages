import {createConfigurableDynamicRootModule} from "@trejgun/nest-js-create-dynamic-module";
import {HttpModule, Logger, Module} from "@nestjs/common";

import {ProviderType} from "./mailjet.constants";
import {MailjetService} from "./mailjet.service";
import {IMailjetOptions} from "./interfaces";

@Module({
  imports: [HttpModule],
  providers: [Logger, MailjetService],
  exports: [MailchimpModule, MailjetService],
})
export class MailchimpModule extends createConfigurableDynamicRootModule<MailchimpModule, IMailjetOptions>(
  ProviderType.MAILJET_OPTIONS,
) {
  static Deferred = MailchimpModule.externallyConfigured(MailchimpModule, 1000);
}
