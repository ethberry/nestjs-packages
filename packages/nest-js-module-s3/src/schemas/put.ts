import {ApiProperty} from "@nestjs/swagger";

import {IsString} from "@trejgun/nest-js-validators";

import {IS3PutFields} from "../interfaces";

export class S3PutSchema implements IS3PutFields {
  @ApiProperty()
  @IsString({
    required: true,
  })
  public objectName: string;

  @ApiProperty()
  @IsString({
    required: true,
  })
  public contentType: string;

  @ApiProperty()
  @IsString({
    required: false,
  })
  public bucket: string;
}
