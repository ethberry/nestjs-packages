import { Module, Logger } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

import { LicenseModule, licenseProvider } from "@gemunion/nest-js-module-license";

import { GeeTestController } from "./geetest.controller";
import { GeeTestService } from "./geetest.service";
import { ValidateGeeTest } from "./geetest.validator";

@Module({
  imports: [LicenseModule.deferred(), ConfigModule, HttpModule],
  controllers: [GeeTestController],
  providers: [licenseProvider, Logger, GeeTestService, ValidateGeeTest],
  exports: [GeeTestService, ValidateGeeTest],
})
export class GeeTestModule {}
