import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

import { IS3PutSignedDto } from "../interfaces";

export class S3PutDto implements IS3PutSignedDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public objectName: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public contentType: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "typeMismatch" })
  public bucket: string;
}