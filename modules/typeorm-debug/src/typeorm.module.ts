import { DynamicModule, Module } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";

import { GemunionTypeormModule } from "@gemunion/nest-js-module-typeorm";
import { DebugModule } from "@gemunion/nest-js-module-debug";

@Module({})
export class GemunionTypeormDebugModule {
  static forRoot(options: ConnectionOptions): DynamicModule {
    return {
      module: GemunionTypeormModule,
      imports: [GemunionTypeormModule.forRoot(options), DebugModule],
    };
  }
}
