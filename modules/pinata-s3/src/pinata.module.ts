import { DynamicModule, Logger, Module } from "@nestjs/common";

import { createConfigurableDynamicRootModule } from "@gemunion/nest-js-create-dynamic-module";
import { S3Module } from "@gemunion/nest-js-module-s3";

import { IPinataOptions } from "./interfaces";
import { PinataService } from "./pinata.service";
import { PINATA_OPTIONS_PROVIDER } from "./pinata.constants";

@Module({
  imports: [S3Module.deferred()],
  providers: [Logger, PinataService],
  exports: [PinataService],
})
export class PinataModule extends createConfigurableDynamicRootModule<PinataModule, IPinataOptions>(
  PINATA_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => PinataModule.externallyConfigured(PinataModule, 0);
}
