import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";
import { decorate } from "ts-mixer";

import { ISearchDto } from "@gemunion/types-collection";

import { PaginationDto } from "./pagination";

export class SearchDto extends PaginationDto implements ISearchDto {
  @decorate(ApiPropertyOptional())
  @decorate(IsOptional())
  @decorate(IsString({ message: "typeMismatch" }))
  public query: string;
}
