import { DynamicModule, Logger, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { createConfigurableDynamicRootModule } from "@gemunion/nest-js-create-dynamic-module";
import { LicenseGuard, LicenseModule } from "@gemunion/nest-js-module-license";

import { SECRET_MANAGER_OPTIONS_PROVIDER } from "./secret-manager.constants";
import { SecretManagerService } from "./secret-manager.service";
import { ISecretManagerOptions } from "./interfaces";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [
    Logger,
    SecretManagerService,
    {
      provide: APP_GUARD,
      useClass: LicenseGuard,
    },
  ],
  exports: [SecretManagerService],
})
export class SecretManagerModule extends createConfigurableDynamicRootModule<
  SecretManagerModule,
  ISecretManagerOptions
>(SECRET_MANAGER_OPTIONS_PROVIDER) {
  static deferred = (): Promise<DynamicModule> => SecretManagerModule.externallyConfigured(SecretManagerModule, 0);
}
