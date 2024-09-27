import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

import { imageUrl } from "@ethberry/constants";

import { NftStorageFirebaseService } from "./nft-storage.service";

@Controller("/nft-storage-firebase")
export class NftStorageFirebaseController {
  constructor(private readonly nftStorageService: NftStorageFirebaseService) {}

  @Get("/test-download")
  public testDownload(@Res() res: Response): void {
    const file = this.nftStorageService.testFirebase(new URL(imageUrl).pathname.split("/").pop()!);
    file.pipe(res);
  }
}
