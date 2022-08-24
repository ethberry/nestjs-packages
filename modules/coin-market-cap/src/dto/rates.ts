import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

import { ISearchRates } from "../interfaces";

export class SearchRates implements ISearchRates {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public baseCoinId: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public targetCoinId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: "typeMismatch" })
  @Min(1, { message: "rangeUnderflow" })
  public start: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: "typeMismatch" })
  @Min(1, { message: "rangeUnderflow" })
  public limit: string;
}
