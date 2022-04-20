import { DynamicModule, Logger, Module, OnModuleInit } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { LicenseService } from "./license.service";
import { LICENSE_KEY } from "./license.constants";
import { licenseProvider } from "./license.provider";

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [licenseProvider, Logger, LicenseService],
  exports: [LICENSE_KEY, LicenseService],
})
export class LicenseModule
  extends createConfigurableDynamicRootModule<LicenseModule, string>(LICENSE_KEY)
  implements OnModuleInit
{
  constructor(private readonly licenseService: LicenseService) {
    super();
  }

  static deferred = (): Promise<DynamicModule> => LicenseModule.externallyConfigured(LicenseModule, 0);

  public async onModuleInit(): Promise<void> {
    await this.licenseService.refresh();
    this.licenseService.isValid();
  }
}
