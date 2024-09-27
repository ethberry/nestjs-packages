import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsJSON, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

import { ISearchableDto } from "@ethberry/types-collection";
import { titleMaxLength, titleMinLength } from "@ethberry/constants";

export class SearchableDto implements ISearchableDto {
  @decorate(
    ApiProperty({
      type: String,
    }),
  )
  @decorate(IsString({ message: "typeMismatch" }))
  @decorate(MinLength(titleMinLength, { message: "tooShort" }))
  @decorate(MaxLength(titleMaxLength, { message: "tooLong" }))
  public title: string;

  @decorate(
    ApiProperty({
      type: String,
    }),
  )
  @decorate(IsJSON({ message: "patternMismatch" }))
  public description: string;
}

export class SearchableOptionalDto implements ISearchableDto {
  @decorate(
    ApiPropertyOptional({
      type: String,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString({ message: "typeMismatch" }))
  @decorate(MinLength(titleMinLength, { message: "tooShort" }))
  @decorate(MaxLength(titleMaxLength, { message: "tooLong" }))
  public title: string;

  @decorate(
    ApiPropertyOptional({
      type: String,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsJSON({ message: "patternMismatch" }))
  public description: string;
}
