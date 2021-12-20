import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

import { ISearchDto } from "@gemunion/types-collection";

import { PaginationDto } from "./pagination";

export class SearchDto extends PaginationDto implements ISearchDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "typeMismatch" })
  public query: string;
}
