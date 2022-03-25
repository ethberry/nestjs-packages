import { Module, DynamicModule } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { TypeOrmLoggerModule, TypeOrmLoggerService } from "@gemunion/nest-js-module-typeorm-logger";
import { LicenseGuard, LicenseModule } from "@gemunion/nest-js-module-license";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LicenseGuard,
    },
  ],
})
export class GemunionTypeormModule {
  static forRoot(options: DataSource): DynamicModule {
    return TypeOrmModule.forRootAsync({
      imports: [TypeOrmLoggerModule, ConfigModule],
      inject: [TypeOrmLoggerService, ConfigService],
      useFactory: (typeOrmLoggerService: TypeOrmLoggerService, configService: ConfigService) => {
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
