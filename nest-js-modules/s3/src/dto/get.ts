import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "@gemunion/nest-js-validators";

import { IS3GetSignedDto } from "../interfaces";

export class S3GetDto implements IS3GetSignedDto {
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
