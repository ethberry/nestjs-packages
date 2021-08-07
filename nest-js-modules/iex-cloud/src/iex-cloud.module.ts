import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

import { IexCloudService } from "./iex-cloud.service";

// import { IexCloudController } from "./iex-cloud.controller";

@Module({
  imports: [HttpModule, ConfigModule],
  // controllers: [IexCloudController],
  providers: [IexCloudService],
  exports: [IexCloudService],
})
export class IexCloudModule {}
