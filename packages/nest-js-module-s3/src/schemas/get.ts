import {ApiProperty} from "@nestjs/swagger";

import {IsString} from "@trejgun/nest-js-validators";

import {IS3GetFields} from "../interfaces";

export class S3GetSchema implements IS3GetFields {
  @ApiProperty()
  @IsString({
    required: true,
  })
  public objectName: string;
}
