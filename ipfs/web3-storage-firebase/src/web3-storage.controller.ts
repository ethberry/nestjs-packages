import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

import { imageUrl } from "@ethberry/constants";

import { Web3StorageFirebaseService } from "./web3-storage.service";

@Controller("/web3-storage-firebase")
export class Web3StorageFirebaseController {
  constructor(private readonly web3StorageService: Web3StorageFirebaseService) {}

  @Get("/test-download")
  public testDownload(@Res() res: Response): void {
    const file = this.web3StorageService.testFirebase(new URL(imageUrl).pathname.split("/").pop()!);
    file.pipe(res);
  }
}
