import {Type} from "class-transformer";
import {ApiPropertyOptional} from "@nestjs/swagger";

import {IsNumber} from "@trejgun/nest-js-validators";
import {IPaginationFields} from "@trejgun/types-collection";

import {defaultItemsPerPage} from "./constants";

export class CommonPaginationSchema implements IPaginationFields {
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
