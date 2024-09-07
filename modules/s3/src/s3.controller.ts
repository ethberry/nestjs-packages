import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";

// import { Public } from "@gemunion/nest-js-utils";
import { S3DeleteDto, S3GetDto, S3PutDto } from "./dto";
import { S3Service } from "./s3.service";
import { IS3Result } from "./interfaces";

// @Public()
@Controller("/s3")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get("/put")
  public putSignedObject(@Query() data: S3PutDto): Promise<IS3Result> {
    return this.s3Service.putSignedObject(data);
  }

  @Get("/get")
  public getSignedObject(@Query() data: S3GetDto): Promise<IS3Result> {
    return this.s3Service.getSignedObject(data);
  }

  @Get("/get-stream")
  public async getObjectAsStream(@Query() data: S3GetDto, @Res() res: Response): Promise<void> {
    const file = await this.s3Service.getObjectAsReadable(data);
    file.pipe(res);
  }

  @Get("/delete")
  public deleteObject(@Query() data: S3DeleteDto): Promise<any> {
    return this.s3Service.deleteObject(data);
  }
}
