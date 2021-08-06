import { createConfigurableDynamicRootModule } from "@trejgun/nest-js-create-dynamic-module";
import { DynamicModule, Logger, Module } from "@nestjs/common";

import { SES_OPTIONS_PROVIDER } from "./ses.constants";
import { SesService } from "./ses.service";
import { ISesOptions } from "./interfaces";

@Module({
  providers: [Logger, SesService],
  exports: [SesService],
})
export class SesModule extends createConfigurableDynamicRootModule<SesModule, ISesOptions>(SES_OPTIONS_PROVIDER) {
  static Deferred = (): Promise<DynamicModule> => SesModule.externallyConfigured(SesModule, 0);
}
