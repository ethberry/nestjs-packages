import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

import { PinataService } from "./pinata.service";
import { IPinataAuth } from "./interfaces";

@Controller("/pinata")
export class PinataController {
  constructor(private readonly pinataService: PinataService) {}

  @Get("/test-authentication")
  public testPinata(): Promise<IPinataAuth> {
    return this.pinataService.testPinata();
  }

  @Get("/test-s3")
  public testS3(@Res() res: Response): void {
    const file = this.pinataService.testS3("DO_NOT_REMOVE.jpg");
    file.pipe(res);
  }
}
