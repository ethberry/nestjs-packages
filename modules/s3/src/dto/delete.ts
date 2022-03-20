import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

import { IS3DeleteDto } from "../interfaces";

export class S3DeleteDto implements IS3DeleteDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public objectName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "typeMismatch" })
  public bucket: string;
}
