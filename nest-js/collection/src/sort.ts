import { ApiPropertyOptional } from "@nestjs/swagger";

import { IsString } from "@trejgun/nest-js-validators";
import { ISortDto, SortDirection } from "@trejgun/types-collection";

import { SearchDto } from "./search";

export class SortDto<T> extends SearchDto implements ISortDto<T> {
  @ApiPropertyOptional()
  @IsString({
    required: false,
  })
  public sortBy: keyof T;

  @ApiPropertyOptional({
    enum: SortDirection,
  })
  @IsString({
    required: false,
    enum: SortDirection,
  })
  public sort: SortDirection;
}
