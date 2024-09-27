import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { TypeOrmLoggerModule, TypeOrmLoggerService } from "@ethberry/nest-js-module-typeorm-logger";
import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [licenseProvider],
})
export class EthBerryTypeormModule {
  static forRoot(options: PostgresConnectionOptions): DynamicModule {
    return TypeOrmModule.forRootAsync({
      imports: [TypeOrmLoggerModule, ConfigModule],
      inject: [TypeOrmLoggerService, ConfigService],
      useFactory: (typeOrmLoggerService: TypeOrmLoggerService, configService: ConfigService) => {
        typeOrmLoggerService.setOptions(options.logging);
        return {
          ...options,
          url: configService.get<string>("POSTGRES_URL", "postgres://postgres:password@127.0.0.1/postgres"),
          logger: typeOrmLoggerService,
          keepConnectionAlive: configService.get<string>("NODE_ENV", "development") === "test",
        };
      },
    });
  }
}
