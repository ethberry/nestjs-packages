import { Inject, Injectable } from "@nestjs/common";
import PinataClient from "@pinata/sdk";
import { Readable } from "stream";

import { S3Service } from "@gemunion/nest-js-module-s3";

import { PINATA_OPTIONS_PROVIDER } from "./pinata.constants";
import { IPinataAuth, IPinataOptions } from "./interfaces";

@Injectable()
export class PinataS3Service {
  private client: PinataClient;

  constructor(
    @Inject(PINATA_OPTIONS_PROVIDER)
    private readonly options: IPinataOptions,
    private readonly s3Service: S3Service,
  ) {
    this.client = new PinataClient(options.pinataApiKey, options.pinataApiSecret);
  }

  public testPinata(): Promise<IPinataAuth> {
    return this.client.testAuthentication();
  }

  public testS3(objectName: string): Promise<Readable> {
    return this.s3Service.getObjectAsStream({
      objectName,
    });
  }

  public pinFileToIPFS(objectName: string): Promise<string> {
    const stream = this.s3Service.getObjectAsStream({ objectName });

    // https://github.com/PinataCloud/Pinata-SDK/issues/28#issuecomment-816439078
    // @ts-ignore
    stream.path = objectName;

    return this.client
      .pinFileToIPFS(stream, {
        pinataMetadata: {
          name: objectName,
        },
        pinataOptions: {
          cidVersion: 0,
        },
      })
      .then(result => result.IpfsHash);
  }

  public pinJSONToIPFS(data: Record<string, any>, objectName: string): Promise<string> {
    return this.client
      .pinJSONToIPFS(data, {
        pinataMetadata: {
          name: objectName,
        },
        pinataOptions: {
          cidVersion: 0,
        },
      })
      .then(result => result.IpfsHash);
  }

  public async unpin(cid: string): Promise<void> {
    await this.client.unpin(cid);
  }
}
