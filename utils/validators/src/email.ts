import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, MaxLength } from "class-validator";
import { Transform } from "class-transformer";
import { decorate } from "ts-mixer";

import { emailMaxLength } from "@gemunion/constants";

export class EmailDto {
  @decorate(
    ApiProperty({
      type: String,
      maxLength: emailMaxLength,
    }),
  )
  @decorate(IsEmail({}, { message: "patternMismatch" }))
  @decorate(MaxLength(emailMaxLength, { message: "rangeOverflow" }))
  @decorate(Transform(({ value }: { value: string }) => value.toLowerCase()))
  public email: string;
}

export class EmailOptionalDto {
  @decorate(
    ApiPropertyOptional({
      type: String,
      maxLength: emailMaxLength,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsEmail({}, { message: "patternMismatch" }))
  @decorate(MaxLength(emailMaxLength, { message: "rangeOverflow" }))
  @decorate(Transform(({ value }: { value: string }) => value.toLowerCase()))
  public email: string;
}
