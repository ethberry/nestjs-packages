import {ApiPropertyOptional} from "@nestjs/swagger";

import {IsString} from "@trejgun/nest-js-validators";
import {IOrderFields, OrderDirection} from "@trejgun/types-collection";

import {CommonSearchSchema} from "./search";

export class CommonOrderSchema<T> extends CommonSearchSchema implements IOrderFields<T> {
  @ApiPropertyOptional()
  @IsString({
    required: false,
  })
  public orderBy: keyof T;

  @ApiPropertyOptional({
    enum: OrderDirection,
  })
  @IsString({
    required: false,
    enum: OrderDirection,
  })
  public order: OrderDirection;
}
