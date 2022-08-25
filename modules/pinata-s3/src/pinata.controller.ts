import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

import { imageUrl } from "@gemunion/constants";

import { PinataS3Service } from "./pinata.service";
import { IPinataAuth } from "./interfaces";

@Controller("/pinata-s3")
export class PinataS3Controller {
  constructor(private readonly pinataService: PinataS3Service) {}

  @Get("/test-authentication")
  public testPinata(): Promise<IPinataAuth> {
    return this.pinataService.testPinata();
  }

  @Get("/test-s3")
  public testS3(@Res() res: Response): void {
    const file = this.pinataService.testS3(imageUrl);
    file.pipe(res);
  }
}
