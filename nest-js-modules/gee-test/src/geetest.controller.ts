import { Body, Controller, Get, Ip, Post } from "@nestjs/common";

import { Public } from "@gemunionstudio/nest-js-utils";

import { GeeTestService } from "./geetest.service";
import { IRegisterResult, IValidateDto } from "./interfaces";
import { ValidateDto } from "./dto";

@Public()
@Controller("/gee-test")
export class GeeTestController {
  constructor(private readonly geeCaptchaService: GeeTestService) {}

  @Get("/register")
  public register(@Ip() ip: string): Promise<IRegisterResult> {
    return this.geeCaptchaService.register(ip);
  }

  @Post("/validate")
  public validate(@Body() body: ValidateDto): IValidateDto {
    return body;
  }
}
