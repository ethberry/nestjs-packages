import { Inject, Injectable } from "@nestjs/common";
import PinataClient from "@pinata/sdk";

import { FirebaseService } from "@gemunion/nest-js-module-firebase";

import { PINATA_OPTIONS_PROVIDER } from "./pinata.constants";
import { IPinataAuth, IPinataOptions } from "./interfaces";
import { Readable } from "stream";

@Injectable()
export class PinataFirebaseService {
  private client: PinataClient;

  constructor(
    @Inject(PINATA_OPTIONS_PROVIDER)
    private readonly options: IPinataOptions,
    private readonly firebaseService: FirebaseService,
  ) {
    this.client = new PinataClient(options.pinataApiKey, options.pinataApiSecret);
  }

  public testPinata(): Promise<IPinataAuth> {
    return this.client.testAuthentication();
  }

  public testFirebase(objectName: string): Readable {
    return this.firebaseService.getObjectAsReadable({
      objectName,
    });
  }

  public pinFileToIPFS(objectName: string): Promise<string> {
    const stream = this.firebaseService.getObjectAsReadable({ objectName });

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
