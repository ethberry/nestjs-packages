import { Injectable } from "@nestjs/common";
import { verifyADR36Amino } from "@keplr-wallet/cosmos";
import { decodeSignature } from "@cosmjs/amino";

import { phrase } from "@gemunion/constants";
import { IKeplrDto } from "@gemunion/types-jwt";

@Injectable()
export class KeplrService {
  public isValidSignature(dto: IKeplrDto): boolean {
    const { chainPrefix, nonce, wallet, signature } = dto;

    const data = `${phrase}${nonce}`;
    const decodedSignature = decodeSignature(signature);
    return verifyADR36Amino(
      chainPrefix,
      wallet,
      data,
      decodedSignature.pubkey,
      decodedSignature.signature,
      "ethsecp256k1",
    );
  }
}
