import { Inject, Injectable } from "@nestjs/common";
import { Readable, Writable } from "stream";

import { Blob, NFTStorage } from "nft.storage";
import { FirebaseService } from "@gemunion/nest-js-module-firebase";

import { NFTSTORAGE_OPTIONS_PROVIDER } from "./nft-storage.constants";
import { INftStorageOptions } from "./interfaces";

@Injectable()
export class NftStorageFirebaseService {
  private client: NFTStorage;

  constructor(
    @Inject(NFTSTORAGE_OPTIONS_PROVIDER)
    private readonly options: INftStorageOptions,
    private readonly firebaseService: FirebaseService,
  ) {
    this.client = new NFTStorage({ token: this.options.nftStorageApiToken });
  }

  public testFirebase(objectName: string): Readable {
    return this.firebaseService.getObjectAsReadable({
      objectName,
    });
  }

  public async pinFileToIPFS(objectName: string): Promise<string> {
    const stream = this.firebaseService.getObjectAsReadable({ objectName });
    const buf = await this.streamAsPromise(stream);
    const blob = new Blob([buf]);

    return this.client.storeBlob(blob);
  }

  public async pinJSONToIPFS(data: Record<string, any>): Promise<string> {
    const blob = new Blob([JSON.stringify(data)]);
    return this.client.storeBlob(blob);
  }

  public streamAsPromise = (readable: Readable): Promise<Buffer> => {
    const result: Array<Buffer> = [];
    const w = new Writable({
      write(chunk, encoding, callback) {
        result.push(chunk);
        callback();
      },
    });
    readable.pipe(w);
    return new Promise((resolve, reject) => {
      w.on("finish", resolve);
      w.on("error", reject);
    }).then(() => Buffer.concat(result));
  };
}
