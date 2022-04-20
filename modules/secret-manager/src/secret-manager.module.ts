import { DynamicModule, Logger, Module } from "@nestjs/common";

import { createConfigurableDynamicRootModule } from "@gemunion/nest-js-create-dynamic-module";
import { LicenseModule, licenseProvider } from "@gemunion/nest-js-module-license";

import { SECRET_MANAGER_OPTIONS_PROVIDER } from "./secret-manager.constants";
import { SecretManagerService } from "./secret-manager.service";
import { ISecretManagerOptions } from "./interfaces";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [Logger, SecretManagerService, licenseProvider],
  exports: [SecretManagerService],
})
export class SecretManagerModule extends createConfigurableDynamicRootModule<
  SecretManagerModule,
  ISecretManagerOptions
>(SECRET_MANAGER_OPTIONS_PROVIDER) {
  static deferred = (): Promise<DynamicModule> => SecretManagerModule.externallyConfigured(SecretManagerModule, 0);
}
