import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

import { imageUrl } from "@gemunion/constants";

import { PinataFirebaseService } from "./pinata.service";
import { IPinataAuth } from "./interfaces";

@Controller("/pinata-firebase")
export class PinataFirebaseController {
  constructor(private readonly pinataService: PinataFirebaseService) {}

  @Get("/test-authentication")
  public testPinata(): Promise<IPinataAuth> {
    return this.pinataService.testPinata();
  }

  @Get("/test-firebase")
  public testFirebase(@Res() res: Response): void {
    const file = this.pinataService.testFirebase(imageUrl);
    file.pipe(res);
  }
}
