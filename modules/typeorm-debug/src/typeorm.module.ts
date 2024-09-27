import { DynamicModule, Module } from "@nestjs/common";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { GemunionTypeormModule } from "@ethberry/nest-js-module-typeorm";
import { DebugModule } from "@ethberry/nest-js-module-debug";

@Module({})
export class GemunionTypeormDebugModule {
  static forRoot(options: PostgresConnectionOptions): DynamicModule {
    return {
      module: GemunionTypeormModule,
      imports: [GemunionTypeormModule.forRoot(options), DebugModule],
    };
  }
}
