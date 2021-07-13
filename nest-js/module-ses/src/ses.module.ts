import {createConfigurableDynamicRootModule} from "@trejgun/nest-js-create-dynamic-module";
import {HttpModule, Logger, Module} from "@nestjs/common";

import {ProviderType} from "./ses.constants";
import {SesService} from "./ses.service";
import {ISesOptions} from "./interfaces";

@Module({
  imports: [HttpModule],
  providers: [Logger, SesService],
  exports: [SesModule, SesService],
})
export class SesModule extends createConfigurableDynamicRootModule<SesModule, ISesOptions>(ProviderType.SES_OPTIONS) {
  static Deferred = SesModule.externallyConfigured(SesModule, 1000);
}
