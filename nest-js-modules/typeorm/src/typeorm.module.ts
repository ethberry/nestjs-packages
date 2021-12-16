import { Module, DynamicModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectionOptions } from "typeorm";

import { TypeOrmLoggerModule, TypeOrmLoggerService } from "@gemunion/nest-js-module-typeorm-logger";

@Module({})
export class GemunionTypeormModule {
  static forRoot(options: ConnectionOptions): DynamicModule {
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
