import { Injectable } from "@nestjs/common";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";

import { phrase } from "@ethberry/constants";
import { IWalletConnectDto } from "@ethberry/types-jwt";

@Injectable()
export class WalletConnectService {
  public isValidSignature(dto: IWalletConnectDto): boolean {
    const { nonce, wallet, signature } = dto;
    const recovered = recoverPersonalSignature({
      data: `0x${Buffer.from(`${phrase}${nonce}`).toString("hex")}`,
      signature,
    });

    return recovered === wallet.toLowerCase();
  }
}
