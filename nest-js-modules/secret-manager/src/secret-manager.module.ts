import { createConfigurableDynamicRootModule } from "@gemunion/nest-js-create-dynamic-module";
import { DynamicModule, Logger, Module } from "@nestjs/common";

import { SECRET_MANAGER_OPTIONS_PROVIDER } from "./secret-manager.constants";
import { SecretManagerService } from "./secret-manager.service";
import { ISecretManagerOptions } from "./interfaces";

@Module({
  providers: [Logger, SecretManagerService],
  exports: [SecretManagerService],
})
export class SecretManagerModule extends createConfigurableDynamicRootModule<
  SecretManagerModule,
  ISecretManagerOptions
>(SECRET_MANAGER_OPTIONS_PROVIDER) {
  static deferred = (): Promise<DynamicModule> => SecretManagerModule.externallyConfigured(SecretManagerModule, 0);
}
