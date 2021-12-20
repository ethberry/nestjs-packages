import { APP_GUARD, DiscoveryModule } from "@nestjs/core";
import { DynamicModule, Global, Logger, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";

import { LicenseService } from "./license.service";
import { LICENSE_KEY } from "./license.constants";
import { LicenseGuard } from "./license.guard";

@Global()
@Module({
  imports: [ScheduleModule.forRoot(), HttpModule, DiscoveryModule],
  providers: [
    Logger,
    LicenseService,
    {
      provide: APP_GUARD,
      useClass: LicenseGuard,
    },
  ],
})
export class LicenseModule {
  static forRoot(licenseKey: string): DynamicModule {
    return {
      module: LicenseModule,
      providers: [
        LicenseService,
        {
          provide: LICENSE_KEY,
          useValue: licenseKey,
        },
      ],
    };
  }
}
