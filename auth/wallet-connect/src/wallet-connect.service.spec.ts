import { Test } from "@nestjs/testing";
import { Wallet } from "ethers";
import { v4 } from "uuid";

import { phrase } from "@ethberry/constants";

import { WalletConnectService } from "./wallet-connect.service";

describe("WalletConnectService", () => {
  let metamaskService: WalletConnectService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [WalletConnectService],
    }).compile();

    metamaskService = moduleRef.get<WalletConnectService>(WalletConnectService);
  });

  describe("batch (quote)", () => {
    it("should get batch data", async () => {
      const signer = new Wallet("0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
      const nonce = v4();
      const isValid = metamaskService.isValidSignature({
        nonce,
        signature: await signer.signMessage(`${phrase}${nonce}`),
        wallet: signer.address.toLowerCase(),
      });
      expect(isValid).toBeTruthy();
    });
  });
});
