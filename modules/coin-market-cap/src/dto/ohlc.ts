import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { ISearchOhlc } from "../interfaces";

export class SearchOhlc implements ISearchOhlc {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public baseCoinId: string;
}
