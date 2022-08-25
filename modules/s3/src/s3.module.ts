import { DynamicModule, Logger, Module } from "@nestjs/common";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { LicenseModule, licenseProvider } from "@gemunion/nest-js-module-license";

import { IS3Options } from "./interfaces";
import { S3Service } from "./s3.service";
import { S3_OPTIONS_PROVIDER } from "./s3.constants";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [Logger, licenseProvider, S3Service],
  exports: [S3Service],
})
export class S3Module extends createConfigurableDynamicRootModule<S3Module, IS3Options>(S3_OPTIONS_PROVIDER) {
  static deferred = (): Promise<DynamicModule> => S3Module.externallyConfigured(S3Module, 0);
}
