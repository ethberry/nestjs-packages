import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { decorate } from "ts-mixer";

import { IsBigInt } from "./big-int";

export class AmountDto {
  @decorate(
    ApiProperty({
      type: Number,
    }),
  )
  @decorate(IsBigInt({}, { message: "typeMismatch" }))
  public amount: string;
}

export class AmountOptionalDto {
  @decorate(
    ApiPropertyOptional({
      type: Number,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsBigInt({}, { message: "typeMismatch" }))
  public amount: string;
}
