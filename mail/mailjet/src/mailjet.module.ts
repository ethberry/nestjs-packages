import { DynamicModule, Logger, Module } from "@nestjs/common";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { MAILJET_OPTIONS_PROVIDER } from "./mailjet.constants";
import { MailjetService } from "./mailjet.service";
import { IMailjetOptions } from "./interfaces";

@Module({
  providers: [Logger, MailjetService],
  exports: [MailjetService],
})
export class MailjetModule extends createConfigurableDynamicRootModule<MailjetModule, IMailjetOptions>(
  MAILJET_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => MailjetModule.externallyConfigured(MailjetModule, 0);
}
