import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

import { IS3GetSignedDto } from "../interfaces";

export class S3GetDto implements IS3GetSignedDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public objectName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "typeMismatch" })
  public bucket: string;
}
