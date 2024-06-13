import { Test } from "@nestjs/testing";

import { KeplrService } from "./keplr.service";

describe("KeplrService", () => {
  let keplrService: KeplrService;

  const keplrSignature = {
    pub_key: {
      type: "tendermint/PubKeySecp256k1",
      value: "Ao1r+mJa1f21ga29Fvjlscjt8h8InK9rGrdY7BpMfCYo",
    },
    signature: "KE7mjGG/TItV1Z5G+BRqsRTvNqEmPupgK5iaU+H9YWMy3QwoK73f9kPSDdcUzJ9g5eg49tm41z6aW596C1a3kg==",
  };
  const wallet = "haqq1xm33hk6q4kgr6h7p2hsg5vy523htdps54jqcwr";
  const nonce = "d785d055-8fec-4a2b-ad8b-70bca8935b60";

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [KeplrService],
    }).compile();

    keplrService = moduleRef.get<KeplrService>(KeplrService);
  });

  describe("batch (quote)", () => {
    it("should get batch data", () => {
      const isValid = keplrService.isValidSignature({
        nonce,
        chainPrefix: "haqq",
        signature: keplrSignature,
        wallet,
      });
      expect(isValid).toBeTruthy();
    });
  });
});
