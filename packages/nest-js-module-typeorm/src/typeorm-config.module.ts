import {DynamicModule, Module, ValueProvider} from "@nestjs/common";
import {ConnectionOptions} from "typeorm";

import {TypeOrmConfigService} from "./typeorm-config.service";
import {TypeOrmLoggerModule} from "./typeorm-logger.module";
import {ProviderType} from "./typeorm-config.constants";

@Module({})
export class TypeOrmConfigModule {
  static forRoot(options: ConnectionOptions): DynamicModule {
    const TypeOrmOptionsProvider: ValueProvider<ConnectionOptions> = {
      provide: ProviderType.TYPEORM_OPTIONS,
      useValue: options,
    };

    return {
      module: TypeOrmConfigModule,
      imports: [TypeOrmLoggerModule],
      providers: [TypeOrmOptionsProvider, TypeOrmConfigService],
      exports: [TypeOrmConfigService],
    };
  }
}
