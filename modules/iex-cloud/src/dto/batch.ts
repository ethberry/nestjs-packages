import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

import { BatchTypes } from "@ethberry/types-iex-cloud";

import { IBatchDto } from "../interfaces";

export class BatchDto implements IBatchDto {
  @ApiProperty({ isArray: true })
  @IsString({ each: true })
  public symbols: Array<string>;

  @ApiProperty({ isArray: true })
  @IsString({ each: true })
  public types: Array<BatchTypes>;

  @ApiPropertyOptional()
  @IsString()
  public range?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  public last?: number;
}
