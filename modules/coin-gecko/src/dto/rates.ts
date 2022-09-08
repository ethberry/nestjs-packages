import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { Transform } from "class-transformer";

import { ISearchRates } from "../interfaces";

export class SearchRates implements ISearchRates {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  public baseCoinId: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  public targetCoinId: string;

  @ApiProperty()
  @IsArray({ message: "typeMismatch" })
  @IsString({ each: true, message: "typeMismatch" })
  public exchangeIds: Array<string>;
}
