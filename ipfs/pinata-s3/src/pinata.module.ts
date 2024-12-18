import { DynamicModule, Logger, Module } from "@nestjs/common";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { S3Module } from "@ethberry/nest-js-module-s3";

import { IPinataOptions } from "./interfaces";
import { PinataS3Service } from "./pinata.service";
import { PINATA_OPTIONS_PROVIDER } from "./pinata.constants";

@Module({
  imports: [S3Module.deferred()],
  providers: [Logger, PinataS3Service],
  exports: [PinataS3Service],
})
export class PinataModule extends createConfigurableDynamicRootModule<PinataModule, IPinataOptions>(
  PINATA_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => PinataModule.externallyConfigured(PinataModule, 0);
}
