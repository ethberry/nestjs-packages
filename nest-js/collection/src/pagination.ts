import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { IsNumber } from "@gemunionstudio/nest-js-validators";
import { IPaginationDto } from "@gemunionstudio/types-collection";

import { defaultItemsPerPage } from "./constants";

export class PaginationDto implements IPaginationDto {
  @ApiPropertyOptional({
    type: Number,
    default: 0,
  })
  @IsNumber({
    required: false,
  })
  @Type(() => Number)
  public skip = 0;

  @ApiPropertyOptional({
    type: Number,
    default: defaultItemsPerPage,
  })
  @IsNumber({
    required: false,
  })
  @Type(() => Number)
  public take = defaultItemsPerPage;
}
