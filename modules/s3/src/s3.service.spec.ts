import { Test } from "@nestjs/testing";
import { Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import path from "path";
import { URL } from "url";

import { S3Service } from "./s3.service";
import { S3_OPTIONS_PROVIDER } from "./s3.constants";
import { IS3Options, ISdkOptions } from "./interfaces";

describe("S3Service", () => {
  let s3Service: S3Service;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.env`,
        }),
      ],
      providers: [
        Logger,
        S3Service,
        {
          provide: S3_OPTIONS_PROVIDER,
          inject: [ConfigService],
          useFactory: (configService: ConfigService): ISdkOptions & IS3Options => {
            return {
              region: configService.get<string>("AWS_REGION", ""),
              accessKeyId: configService.get<string>("AWS_ACCESS_KEY_ID", ""),
              secretAccessKey: configService.get<string>("AWS_SECRET_ACCESS_KEY", ""),
              bucket: configService.get<string>("AWS_S3_BUCKET", ""),
            };
          },
        },
      ],
    }).compile();

    s3Service = moduleRef.get<S3Service>(S3Service);
  });

  describe("putSignedObject", () => {
    describe("EXT", () => {
      it("should get url for JPEG", async () => {
        const { signedUrl } = await s3Service.putSignedObject({
          objectName: "qwerty.jpg",
          contentType: "image/jpeg",
          bucket: "images",
        });
        expect(path.extname(new URL(signedUrl).pathname)).toEqual(".jpeg");
      });

      it("should get url for TXT", async () => {
        const { signedUrl } = await s3Service.putSignedObject({
          objectName: "qwerty.txt",
          contentType: "text/plain",
          bucket: "docs",
        });
        expect(path.extname(new URL(signedUrl).pathname)).toEqual(".txt");
      });

      it("should get url for PDF", async () => {
        const { signedUrl } = await s3Service.putSignedObject({
          objectName: "qwerty.pdf",
          contentType: "application/pdf",
          bucket: "docs",
        });
        expect(path.extname(new URL(signedUrl).pathname)).toEqual(".pdf");
      });

      it("should get url for MOV", async () => {
        const { signedUrl } = await s3Service.putSignedObject({
          objectName: "qwerty.mov",
          contentType: "video/quicktime",
          bucket: "video",
        });
        expect(path.extname(new URL(signedUrl).pathname)).toEqual(".qt");
      });
    });

    describe("EXT with CHARSET", () => {
      it("should get url for JSON", async () => {
        const { signedUrl } = await s3Service.putSignedObject({
          objectName: "qwerty.json",
          contentType: "application/json; charset=utf-8",
          bucket: "json",
        });
        expect(path.extname(new URL(signedUrl).pathname)).toEqual(".json");
      });
    });
  });
});
