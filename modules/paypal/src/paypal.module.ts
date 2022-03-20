import { Module, Logger } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { PayPalService } from "./paypal.service";

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [Logger],
  exports: [PayPalService],
})
export class PayPalModule {}
