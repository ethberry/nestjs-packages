# License module

This module is designed to preserve Gemunion rights for intellectual property

Every hour it connects to license server to check license and stores the latest data

On demand the license information is passed to other modules
for their needs and potential error message is printed to the console

Failsafe mechanism will make 24 attempts to refresh license info before realising last result
This will give us enough time to react if our server is down

## Usage in the project

### Sync
```ts
import { Module } from "@nestjs/common";
import { LICENSE_KEY, LicenseModule } from "@gemunion/nest-js-module-license";

@Module({
  imports: [
    LicenseModule.forRoot(LicenseModule, "XXX"),
  ],
})
export class AppModule {}
```

### Async
```ts
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LICENSE_KEY, LicenseModule } from "@gemunion/nest-js-module-license";

@Module({
  imports: [
    LicenseModule.forRootAsync(LicenseModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): string => {
        return configService.get<string>("LICENSE", "XXX");
      },
    }),
  ],
})
export class AppModule {}
```

## Usage in a module

### license key

```ts
import { Module } from "@nestjs/common";
import { LICENSE_KEY, LicenseModule } from "@gemunion/nest-js-module-license";

@Module({
  imports: [LicenseModule.deferred()],
})
export class MyModule {
  constructor(
    @Inject(LICENSE_KEY)
    private readonly licenseKey: string,
  ) {}
}
```

### license service
```ts
import { Module } from "@nestjs/common";
import { LicenseModule, LicenseService } from "@gemunion/nest-js-module-license";

@Module({
  imports: [LicenseModule.deferred()],
})
export class MyModule {
  constructor(
    private readonly licenseService: LicenseService,
  ) {}

  public myMethod(): void {
    const isValid = this.licenseService.checkLicence();
  }
}
```
