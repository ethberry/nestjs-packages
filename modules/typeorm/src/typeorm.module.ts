import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [licenseProvider],
})
export class EthBerryTypeormModule {
  static forRoot(options: PostgresConnectionOptions): DynamicModule {
    return TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...options,
          url: configService.get<string>("POSTGRES_URL", "postgres://postgres:password@127.0.0.1/postgres"),
          keepConnectionAlive: configService.get<string>("NODE_ENV", "development") === "test",
        };
      },
    });
  }
}
