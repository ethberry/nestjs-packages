import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

import { imageUrl } from "@gemunion/constants";

import { InfuraFirebaseService } from "./infura.service";

@Controller("/infura-firebase")
export class InfuraFirebaseController {
  constructor(private readonly infuraService: InfuraFirebaseService) {}

  @Get("/test-download")
  public testFirebase(@Res() res: Response): void {
    const file = this.infuraService.testFirebase(new URL(imageUrl).pathname.split("/").pop()!);
    file.pipe(res);
  }

  @Get("/test-json")
  public testJson(): any {
    return this.infuraService.pinJSONToIPFS({ a: 1 });
  }
}
