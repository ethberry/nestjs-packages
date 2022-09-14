import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsJSON, IsOptional, IsString } from "class-validator";
import { decorate } from "ts-mixer";

import { ISearchableDto } from "@gemunion/types-collection";

import { PaginationDto } from "./pagination";

export class SearchableDto extends PaginationDto implements ISearchableDto {
  @decorate(
    ApiProperty({
      type: String,
    }),
  )
  @decorate(IsString({ message: "typeMismatch" }))
  public title: string;

  @decorate(
    ApiProperty({
      type: String,
    }),
  )
  @decorate(IsJSON({ message: "patternMismatch" }))
  public description: string;
}

export class SearchableOptionalDto extends PaginationDto implements ISearchableDto {
  @decorate(
    ApiPropertyOptional({
      type: String,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString({ message: "typeMismatch" }))
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
