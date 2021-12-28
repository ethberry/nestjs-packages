import { DynamicModule, Logger, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { LicenseGuard, LicenseModule } from "@gemunion/nest-js-module-license";
import { createConfigurableDynamicRootModule } from "@gemunion/nest-js-create-dynamic-module";

import { IS3Options } from "./interfaces";
import { S3Service } from "./s3.service";
import { S3_OPTIONS_PROVIDER } from "./s3.constants";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [
    Logger,
    S3Service,
    {
      provide: APP_GUARD,
      useClass: LicenseGuard,
    },
  ],
  exports: [S3Service],
})
export class S3Module extends createConfigurableDynamicRootModule<S3Module, IS3Options>(S3_OPTIONS_PROVIDER) {
  static deferred = (): Promise<DynamicModule> => S3Module.externallyConfigured(S3Module, 0);
}
