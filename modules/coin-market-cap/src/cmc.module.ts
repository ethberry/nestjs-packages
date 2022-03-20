import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { CmcService } from "./cmc.service";
// import { CmcController } from "./cmc.controller";

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [CmcService],
  // controllers: [CmcController],
  exports: [CmcService],
})
export class CmcModule {}
