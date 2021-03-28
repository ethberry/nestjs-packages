import {Injectable, Inject} from "@nestjs/common";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {ConnectionOptions} from "typeorm";

import {TypeOrmLoggerService} from "./typeorm-logger.service";
import {ProviderType} from "./typeorm-config.constants";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(ProviderType.TYPEORM_OPTIONS)
    private readonly typeOrmOptions: ConnectionOptions,
    private readonly logger: TypeOrmLoggerService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.typeOrmOptions,
      logger: this.logger,
      logging: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "staging",
      keepConnectionAlive: process.env.NODE_ENV === "test",
    };
  }
}
