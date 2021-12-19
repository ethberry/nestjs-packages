import { DynamicModule, Module, Global } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";

import { LicenseService } from "./license.service";
import { NS } from "./license.constants";

@Global()
@Module({
  imports: [ScheduleModule.forRoot(), HttpModule, DiscoveryModule],
  providers: [LicenseService],
})
export class LicenseModule {
  static forRoot(ns: string): DynamicModule {
    return {
      module: LicenseModule,
      providers: [
        LicenseService,
        {
          provide: NS,
          useValue: ns,
        },
      ],
    };
  }
}
