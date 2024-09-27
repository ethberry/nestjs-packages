import { DynamicModule, Logger, Module } from "@nestjs/common";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { FirebaseModule } from "@ethberry/nest-js-module-firebase";

import { IInfuraOptions } from "./interfaces";
import { InfuraFirebaseService } from "./infura.service";
import { INFURA_OPTIONS_PROVIDER } from "./infura.constants";

@Module({
  imports: [FirebaseModule.deferred()],
  providers: [Logger, InfuraFirebaseService],
  exports: [InfuraFirebaseService],
})
export class InfuraFirebaseModule extends createConfigurableDynamicRootModule<InfuraFirebaseModule, IInfuraOptions>(
  INFURA_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => InfuraFirebaseModule.externallyConfigured(InfuraFirebaseModule, 0);
}
