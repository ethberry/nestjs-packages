import { ApiPropertyOptional } from "@nestjs/swagger";

import { IsString } from "@gemunionstudio/nest-js-validators";
import { ISearchDto } from "@gemunionstudio/types-collection";

import { PaginationDto } from "./pagination";

export class SearchDto extends PaginationDto implements ISearchDto {
  @ApiPropertyOptional()
  @IsString({
    required: false,
  })
  public query: string;
}
