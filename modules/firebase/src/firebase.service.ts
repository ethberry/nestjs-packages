import { Inject, Injectable } from "@nestjs/common";
import { Readable } from "stream";
import { Storage } from "@google-cloud/storage";

import { IFirebaseGetDto, IFirebaseOptions } from "./interfaces";
import { FIREBASE_OPTIONS_PROVIDER } from "./firebase.constants";
import { IFirebaseDeleteDto } from "./interfaces/delete";

@Injectable()
export class FirebaseService {
  private client: Storage;

  constructor(
    @Inject(FIREBASE_OPTIONS_PROVIDER)
    private readonly options: IFirebaseOptions,
  ) {
    this.client = new Storage();
  }

  public getObjectAsReadable(dto: IFirebaseGetDto): Readable {
    const { objectName, bucket = this.options.bucket } = dto;

    return this.client.bucket(bucket).file(objectName).createReadStream();
  }

  public deleteObject(dto: IFirebaseDeleteDto): Promise<any> {
    const { objectName, bucket = this.options.bucket } = dto;

    return this.client.bucket(bucket).file(objectName).delete();
  }
}
