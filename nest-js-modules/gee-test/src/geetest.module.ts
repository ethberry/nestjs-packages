import { Module, Logger } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

import { GeeTestController } from "./geetest.controller";
import { GeeTestService } from "./geetest.service";
import { ValidateGeeTest } from "./geetest.validator";

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [GeeTestController],
  providers: [Logger, GeeTestService, ValidateGeeTest],
  exports: [GeeTestService, ValidateGeeTest],
})
export class GeeTestModule {}
