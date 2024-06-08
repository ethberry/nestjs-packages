import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";
import { decorate } from "ts-mixer";

export class ChainIdDto {
  @decorate(
    ApiProperty({
      type: Number,
    }),
  )
  @decorate(IsInt({ message: "typeMismatch" }))
  @decorate(Min(1, { each: true, message: "rangeUnderflow" }))
  @decorate(Type(() => Number))
  public chainId: number;
}

export class ChainIdOptionalDto {
  @decorate(
    ApiPropertyOptional({
      type: Number,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsInt({ message: "typeMismatch" }))
  @decorate(Min(1, { each: true, message: "rangeUnderflow" }))
  @decorate(Type(() => Number))
  public chainId: number;
}
