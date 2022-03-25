import { DynamicModule, Module } from "@nestjs/common";
import { DataSource } from "typeorm";

import { GemunionTypeormModule } from "@gemunion/nest-js-module-typeorm";
import { DebugModule } from "@gemunion/nest-js-module-debug";

@Module({})
export class GemunionTypeormDebugModule {
  static forRoot(options: DataSource): DynamicModule {
    return {
      module: GemunionTypeormModule,
      imports: [GemunionTypeormModule.forRoot(options), DebugModule],
    };
  }
}
