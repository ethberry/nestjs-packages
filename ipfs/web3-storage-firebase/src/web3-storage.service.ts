import { Inject, Injectable } from "@nestjs/common";
import { Readable } from "stream";
import path from "path";

import { Web3Storage } from "web3.storage";
import { FirebaseService } from "@gemunion/nest-js-module-firebase";

import { WEB3STORAGE_OPTIONS_PROVIDER } from "./web3-storage.constants";
import { IWeb3StorageOptions } from "./interfaces";

@Injectable()
export class Web3StorageFirebaseService {
  private client: Web3Storage;

  constructor(
    @Inject(WEB3STORAGE_OPTIONS_PROVIDER)
    private readonly options: IWeb3StorageOptions,
    private readonly firebaseService: FirebaseService,
  ) {
    this.client = new Web3Storage({ token: this.options.web3StorageApiToken });
  }

  public testFirebase(objectName: string): Readable {
    return this.firebaseService.getObjectAsReadable({
      objectName,
    });
  }

  public pinFileToIPFS(objectName: string): Promise<string> {
    const stream = this.firebaseService.getObjectAsReadable({ objectName });
    return this.client.put([{ name: objectName, stream: () => Readable.toWeb(stream) }], {
      wrapWithDirectory: false,
    });
  }

  public async pinJSONToIPFS(data: Record<string, any>, objectName: string): Promise<string> {
    const stream = this.getReadable(Buffer.from(JSON.stringify(data)));
    const name = this.changeExtension(objectName, "json");
    return this.client.put([{ name, stream: () => Readable.toWeb(stream) }], {
      wrapWithDirectory: false,
    });
  }

  public getReadable(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  public changeExtension(file: string, extension: string) {
    const basename = path.basename(file, path.extname(file));
    return path.join(path.dirname(file), basename + extension);
  }
}
