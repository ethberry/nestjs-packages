import { Module } from "@nestjs/common";

import { MetamaskService } from "./metamask.service";

@Module({
  providers: [MetamaskService],
  exports: [MetamaskService],
})
export class MetamaskModule {}
