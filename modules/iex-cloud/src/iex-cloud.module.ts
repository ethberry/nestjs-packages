import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

import { LicenseModule, licenseProvider } from "@gemunion/nest-js-module-license";

import { IexCloudService } from "./iex-cloud.service";

// import { IexCloudController } from "./iex-cloud.controller";

@Module({
  imports: [LicenseModule.deferred(), HttpModule, ConfigModule],
  providers: [licenseProvider, IexCloudService],
  // controllers: [IexCloudController],
  exports: [IexCloudService],
})
export class IexCloudModule {}
