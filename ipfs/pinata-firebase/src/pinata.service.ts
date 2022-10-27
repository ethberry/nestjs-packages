import { Inject, Injectable } from "@nestjs/common";
import type { PinataClient } from "@pinata/sdk";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";

import { FirebaseService } from "@gemunion/nest-js-module-firebase";

import { PINATA_OPTIONS_PROVIDER } from "./pinata.constants";
import { IPinataAuth, IPinataOptions } from "./interfaces";

@Injectable()
export class PinataFirebaseService {
  private pinata: PinataClient;

  constructor(
    @Inject(PINATA_OPTIONS_PROVIDER)
    private readonly options: IPinataOptions,
    private readonly firebaseService: FirebaseService,
  ) {
    this.pinata = pinataSDK(options.pinataApiKey, options.pinataApiSecret);
  }

  public testPinata(): Promise<IPinataAuth> {
    return this.pinata.testAuthentication();
  }

  public testFirebase(objectName: string): Readable {
    return this.firebaseService.getObjectAsStream({
      objectName,
    });
  }

  public pinFileToIPFS(objectName: string): Promise<string> {
    const stream = this.firebaseService.getObjectAsStream({ objectName });

    // https://github.com/PinataCloud/Pinata-SDK/issues/28#issuecomment-816439078
    // @ts-ignore
    stream.path = objectName;

    return this.pinata
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
    return this.pinata
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
    await this.pinata.unpin(cid);
  }
}
