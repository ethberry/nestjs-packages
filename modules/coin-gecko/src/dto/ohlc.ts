import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsString, Min } from "class-validator";
import { Transform, Type } from "class-transformer";

import { ISearchOhlc } from "../interfaces";

export class SearchOhlc implements ISearchOhlc {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  public baseCoinId: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  public targetCoinId: string;

  @ApiProperty()
  @IsInt({ message: "typeMismatch" })
  @Min(1, { message: "rangeUnderflow" })
  @IsIn([1, 7, 14, 30, 90, 180, 365], { message: "badInput" })
  @Type(() => Number)
  public days: number;
}
