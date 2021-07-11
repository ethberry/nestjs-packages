import {createConfigurableDynamicRootModule} from "@trejgun/nest-js-create-dynamic-module";
import {HttpModule, Logger, Module} from "@nestjs/common";

import {ProviderType} from "./mailjet.constants";
import {MailjetService} from "./mailjet.service";
import {IMailjetOptions} from "./interfaces";

@Module({
  imports: [HttpModule],
  providers: [Logger, MailjetService],
  exports: [MailjetModule, MailjetService],
})
export class MailjetModule extends createConfigurableDynamicRootModule<MailjetModule, IMailjetOptions>(
  ProviderType.MAILJET_OPTIONS,
) {
  static Deferred = MailjetModule.externallyConfigured(MailjetModule, 1000);
}
