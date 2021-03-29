import {Controller, Get, Query} from "@nestjs/common";

import {S3DeleteSchema, S3GetSchema, S3PutSchema} from "./schemas";
import {S3Service} from "./s3.service";
import {IS3Result} from "./interfaces";

@Controller("/s3")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get("/put")
  public putObject(@Query() data: S3PutSchema): Promise<IS3Result> {
    return this.s3Service.putObject(data);
  }

  @Get("/get")
  public getObject(@Query() data: S3GetSchema): Promise<IS3Result> {
    return this.s3Service.getObject(data);
  }

  @Get("/delete")
  public deleteObject(@Query() data: S3DeleteSchema): Promise<any> {
    return this.s3Service.deleteObject(data);
  }
}
