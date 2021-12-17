import { Global, Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";

import { LicenseService } from "./license.service";

@Global()
@Module({
  imports: [ScheduleModule.forRoot(), HttpModule, DiscoveryModule],
  providers: [LicenseService],
})
export class LicenseModule {}
