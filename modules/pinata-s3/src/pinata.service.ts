import { Inject, Injectable } from "@nestjs/common";
import pinataSDK, { PinataClient, PinataPinResponse } from "@pinata/sdk";
import { Readable } from "stream";

import { S3Service } from "@gemunion/nest-js-module-s3";

import { PINATA_OPTIONS_PROVIDER } from "./pinata.constants";
import { IPinataAuth, IPinataOptions } from "./interfaces";

@Injectable()
export class PinataService {
  private pinata: PinataClient;

  constructor(
    @Inject(PINATA_OPTIONS_PROVIDER)
    private readonly options: IPinataOptions,
    private readonly s3Service: S3Service,
  ) {
    this.pinata = pinataSDK(options.pinataApiKey, options.pinataApiSecret);
  }

  public testPinata(): Promise<IPinataAuth> {
    return this.pinata.testAuthentication();
  }

  public testS3(objectName: string): Readable {
    return this.s3Service.getObjectAsStream({
      objectName,
    });
  }

  public async pinURL(objectName: string) {
    await this.pinFileToIPFS(objectName);
    await this.pinJSONToIPFS({}, objectName);
  }

  public pinFileToIPFS(objectName: string) {
    const stream = this.s3Service.getObjectAsStream({ objectName });

    // https://github.com/PinataCloud/Pinata-SDK/issues/28#issuecomment-816439078
    // @ts-ignore
    stream.path = objectName;

    return this.pinata.pinFileToIPFS(stream, {
      pinataMetadata: {
        name: objectName,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });
  }

  public pinJSONToIPFS(data: Record<string, any>, objectName: string): Promise<PinataPinResponse> {
    return this.pinata.pinJSONToIPFS(data, {
      pinataMetadata: {
        name: objectName,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });
  }
}
