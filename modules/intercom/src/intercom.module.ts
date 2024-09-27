import { DynamicModule, Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";

import { INTERCOM_OPTIONS_PROVIDER } from "./intercom.constants";
import { IntercomService } from "./intercom.service";
import { IIntercomOptions } from "./interfaces";

@Module({
  imports: [LicenseModule.deferred(), ConfigModule, HttpModule],
  providers: [Logger, licenseProvider, IntercomService],
  exports: [IntercomService],
})
export class IntercomModule extends createConfigurableDynamicRootModule<IntercomModule, IIntercomOptions>(
  INTERCOM_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => IntercomModule.externallyConfigured(IntercomModule, 0);
}
