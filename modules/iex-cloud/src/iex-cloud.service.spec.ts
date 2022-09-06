import { Test } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { BatchTypes } from "@gemunion/types-iex-cloud";

import { IexCloudService } from "./iex-cloud.service";

describe.skip("IexCloudService", () => {
  let iexCloudService: IexCloudService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.env`,
        }),
        HttpModule,
      ],
      providers: [IexCloudService],
    }).compile();

    iexCloudService = moduleRef.get<IexCloudService>(IexCloudService);
  });

  describe("batch (quote)", () => {
    it("should get batch data", async () => {
      const data = await iexCloudService.batch({
        symbols: ["NFLX", "FB"],
        types: [BatchTypes.quote],
      });
      expect(data.NFLX.quote).toBeDefined();
      expect(data.FB.quote).toBeDefined();
    });
  });
});
