import {ApiPropertyOptional} from "@nestjs/swagger";

import {IsString} from "@trejgun/nest-js-validators";
import {ISearchDto} from "@trejgun/types-collection";

import {PaginationDto} from "./pagination";

export class SearchDto extends PaginationDto implements ISearchDto {
  @ApiPropertyOptional()
  @IsString({
    required: false,
  })
  public query: string;
}
