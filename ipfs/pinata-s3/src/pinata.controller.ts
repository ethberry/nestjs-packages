import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

import { imageUrl } from "@ethberry/constants";

import { PinataS3Service } from "./pinata.service";
import { IPinataAuth } from "./interfaces";

@Controller("/pinata-s3")
export class PinataS3Controller {
  constructor(private readonly pinataService: PinataS3Service) {}

  @Get("/test-authentication")
  public testPinata(): Promise<IPinataAuth> {
    return this.pinataService.testPinata();
  }

  @Get("/test-download")
  public async testDownload(@Res() res: Response): Promise<void> {
    const file = await this.pinataService.testS3(imageUrl);
    file.pipe(res);
  }
}
