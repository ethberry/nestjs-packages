import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "@gemunion/nest-js-validators";

import { IS3PutSignedDto } from "../interfaces";

export class S3PutDto implements IS3PutSignedDto {
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
