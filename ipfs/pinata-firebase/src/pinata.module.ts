import { DynamicModule, Logger, Module } from "@nestjs/common";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { FirebaseModule } from "@ethberry/nest-js-module-firebase";

import { IPinataOptions } from "./interfaces";
import { PinataFirebaseService } from "./pinata.service";
import { PINATA_OPTIONS_PROVIDER } from "./pinata.constants";

@Module({
  imports: [FirebaseModule.deferred()],
  providers: [Logger, PinataFirebaseService],
  exports: [PinataFirebaseService],
})
export class PinataFirebaseModule extends createConfigurableDynamicRootModule<PinataFirebaseModule, IPinataOptions>(
  PINATA_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => PinataFirebaseModule.externallyConfigured(PinataFirebaseModule, 0);
}
