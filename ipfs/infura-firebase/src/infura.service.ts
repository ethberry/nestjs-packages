import { Inject, Injectable } from "@nestjs/common";
import { create } from "ipfs-http-client";
import type { IPFSHTTPClient } from "ipfs-http-client";
import { Readable } from "stream";

import { FirebaseService } from "@gemunion/nest-js-module-firebase";

import { INFURA_OPTIONS_PROVIDER } from "./infura.constants";
import { IInfuraOptions } from "./interfaces";

@Injectable()
export class InfuraFirebaseService {
  private infura: IPFSHTTPClient;

  constructor(
    @Inject(INFURA_OPTIONS_PROVIDER)
    private readonly options: IInfuraOptions,
    private readonly firebaseService: FirebaseService,
  ) {
    this.infura = create(options);
  }

  public testFirebase(objectName: string): Readable {
    return this.firebaseService.getObjectAsStream({
      objectName,
    });
  }

  public pinFileToIPFS(objectName: string): Promise<string> {
    const stream = this.firebaseService.getObjectAsStream({ objectName });
    return this.infura.add(stream).then(result => result.path);
  }

  public pinJSONToIPFS(data: Record<string, any>, _objectName?: string): Promise<string> {
    return this.infura.add(JSON.stringify(data)).then(result => result.path);
  }
}