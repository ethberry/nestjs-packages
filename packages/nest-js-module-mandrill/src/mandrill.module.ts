import {createConfigurableDynamicRootModule} from "@trejgun/nest-js-create-dynamic-module";
import {HttpModule, Logger, Module} from "@nestjs/common";

import {ProviderType} from "./mandrill.constants";
import {MandrillService} from "./mandrill.service";
import {IMandrillOptions} from "./interfaces";

@Module({
  imports: [HttpModule],
  providers: [Logger, MandrillService],
  exports: [MandrillModule, MandrillService],
})
export class MandrillModule extends createConfigurableDynamicRootModule<MandrillModule, IMandrillOptions>(
  ProviderType.MANDRILL_OPTIONS,
) {
  static Deferred = MandrillModule.externallyConfigured(MandrillModule, 1000);
}
