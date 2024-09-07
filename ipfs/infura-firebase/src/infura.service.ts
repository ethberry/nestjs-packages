import { Inject, Injectable } from "@nestjs/common";
import { create } from "ipfs-http-client";
import type { IPFSHTTPClient } from "ipfs-http-client";
import { Readable } from "stream";

import { FirebaseService } from "@gemunion/nest-js-module-firebase";

import { INFURA_OPTIONS_PROVIDER } from "./infura.constants";
import { IInfuraOptions } from "./interfaces";

@Injectable()
export class InfuraFirebaseService {
  private client: IPFSHTTPClient;

  constructor(
    @Inject(INFURA_OPTIONS_PROVIDER)
    private readonly options: IInfuraOptions,
    private readonly firebaseService: FirebaseService,
  ) {
    this.client = create(options);
  }

  public testFirebase(objectName: string): Readable {
    return this.firebaseService.getObjectAsReadable({
      objectName,
    });
  }

  public pinFileToIPFS(objectName: string): Promise<string> {
    const readable = this.firebaseService.getObjectAsReadable({ objectName });
    return this.client.add(readable).then(result => result.path);
  }

  public pinJSONToIPFS(data: Record<string, any>, _objectName?: string): Promise<string> {
    return this.client.add(JSON.stringify(data)).then(result => result.path);
  }
}
