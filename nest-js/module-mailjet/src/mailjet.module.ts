import {createConfigurableDynamicRootModule} from "@trejgun/nest-js-create-dynamic-module";
import {DynamicModule, HttpModule, Logger, Module} from "@nestjs/common";

import {MAILJET_OPTIONS_PROVIDER} from "./mailjet.constants";
import {MailjetService} from "./mailjet.service";
import {IMailjetOptions} from "./interfaces";

@Module({
  imports: [HttpModule],
  providers: [Logger, MailjetService],
  exports: [MailjetModule, MailjetService],
})
export class MailjetModule extends createConfigurableDynamicRootModule<MailjetModule, IMailjetOptions>(
  MAILJET_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => MailjetModule.externallyConfigured(MailjetModule, 0);
}
