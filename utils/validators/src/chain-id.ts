import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";
import { Transform, Type } from "class-transformer";
import { decorate } from "ts-mixer";

export class ChainIdDto {
  @decorate(
    ApiProperty({
      type: Number,
      minimum: 1,
    }),
  )
  @decorate(Transform(({ value }) => Number(value)))
  @decorate(IsInt({ message: "typeMismatch" }))
  @decorate(Min(1, { each: true, message: "rangeUnderflow" }))
  @decorate(Type(() => Number))
  public chainId: number;
}

export class ChainIdOptionalDto {
  @decorate(
    ApiPropertyOptional({
      type: Number,
      minimum: 1,
    }),
  )
  @decorate(IsOptional())
  @decorate(Transform(({ value }) => Number(value)))
  @decorate(IsInt({ message: "typeMismatch" }))
  @decorate(Min(1, { each: true, message: "rangeUnderflow" }))
  @decorate(Type(() => Number))
  public chainId: number;
}
