import {ApiProperty} from "@nestjs/swagger";

import {IsString} from "@trejgun/nest-js-validators";

import {IS3DeleteFields} from "../interfaces";

export class S3DeleteSchema implements IS3DeleteFields {
  @ApiProperty()
  @IsString({
    required: true,
  })
  public objectName: string;

  @ApiProperty()
  @IsString({
    required: false,
  })
  public bucket: string;
}
