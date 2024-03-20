import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { Transform } from "class-transformer";
import { decorate } from "ts-mixer";

import { TokenType } from "@gemunion/types-blockchain";

export class TokenTypeDto {
  @decorate(
    ApiProperty({
      enum: TokenType,
    }),
  )
  @decorate(Transform(({ value }) => value as TokenType))
  @decorate(IsEnum(TokenType, { message: "badInput" }))
  public tokenType: TokenType;
}
