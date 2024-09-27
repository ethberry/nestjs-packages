import { DynamicModule, Logger, Module } from "@nestjs/common";

import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";
import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";

import { ISecretManagerOptions } from "./interfaces";
import { SecretManagerService } from "./secret-manager.service";
import { SECRET_MANAGER_OPTIONS_PROVIDER } from "./secret-manager.constants";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [Logger, licenseProvider, SecretManagerService],
  exports: [SecretManagerService],
})
export class SecretManagerModule extends createConfigurableDynamicRootModule<
  SecretManagerModule,
  ISecretManagerOptions
>(SECRET_MANAGER_OPTIONS_PROVIDER) {
  static deferred = (): Promise<DynamicModule> => SecretManagerModule.externallyConfigured(SecretManagerModule, 0);
}
