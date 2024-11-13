import { Module } from "@nestjs/common";

import { WalletConnectService } from "./wallet-connect.service";

@Module({
  providers: [WalletConnectService],
  exports: [WalletConnectService],
})
export class WalletConnectModule {}
