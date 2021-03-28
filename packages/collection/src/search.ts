import {ApiPropertyOptional} from "@nestjs/swagger";

import {IsString} from "@trejgun/nest-js-validators";
import {ISearchFields} from "@trejgun/types-collection";

import {CommonPaginationSchema} from "./pagination";

export class CommonSearchSchema extends CommonPaginationSchema implements ISearchFields {
  @ApiPropertyOptional()
  @IsString({
    required: false,
  })
  public query: string;
}
