import { DynamicModule, Module } from "@nestjs/common";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { EthBerryTypeormModule } from "@ethberry/nest-js-module-typeorm";
import { DebugModule } from "@ethberry/nest-js-module-debug";

@Module({})
export class EthBerryTypeormDebugModule {
  static forRoot(options: PostgresConnectionOptions): DynamicModule {
    return {
      module: EthBerryTypeormModule,
      imports: [EthBerryTypeormModule.forRoot(options), DebugModule],
    };
  }
}
