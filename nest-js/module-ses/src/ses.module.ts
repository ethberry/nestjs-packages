import {createConfigurableDynamicRootModule} from "@trejgun/nest-js-create-dynamic-module";
import {DynamicModule, HttpModule, Logger, Module} from "@nestjs/common";

import {SES_OPTIONS_PROVIDER} from "./ses.constants";
import {SesService} from "./ses.service";
import {ISesOptions} from "./interfaces";

@Module({
  imports: [HttpModule],
  providers: [Logger, SesService],
  exports: [SesModule, SesService],
})
export class SesModule extends createConfigurableDynamicRootModule<SesModule, ISesOptions>(SES_OPTIONS_PROVIDER) {
  static Deferred = (): Promise<DynamicModule> => SesModule.externallyConfigured(SesModule, 0);
}
