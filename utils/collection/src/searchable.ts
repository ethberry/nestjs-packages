import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsJSON } from "class-validator";

import { ISearchableDto } from "@gemunion/types-collection";

import { PaginationDto } from "./pagination";

export class SearchableDto extends PaginationDto implements ISearchableDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public title: string;

  @ApiProperty()
  @IsJSON({ message: "patternMismatch" })
  public description: string;
}
