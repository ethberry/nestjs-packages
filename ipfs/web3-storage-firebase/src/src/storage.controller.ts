import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

import { imageUrl } from "@gemunion/constants";

import { Web3StorageFirebaseService } from "./storage.service";

@Controller("/web3-storage-firebase")
export class Web3StorageFirebaseController {
  constructor(private readonly web3StorageService: Web3StorageFirebaseService) {}

  @Get("/test-download")
  public testDownload(@Res() res: Response): void {
    const file = this.web3StorageService.testFirebase(new URL(imageUrl).pathname.split("/").pop()!);
    file.pipe(res);
  }
}