import { Test } from "@nestjs/testing";
import { Wallet } from "ethers";
import { v4 } from "uuid";

import { phrase } from "@ethberry/constants";

import { MetamaskService } from "./metamask.service";

describe("MetamaskService", () => {
  let metamaskService: MetamaskService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MetamaskService],
    }).compile();

    metamaskService = moduleRef.get<MetamaskService>(MetamaskService);
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
