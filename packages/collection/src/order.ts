import {ApiPropertyOptional} from "@nestjs/swagger";

import {IsString} from "@trejgun/nest-js-validators";
import {IOrderDto, OrderDirection} from "@trejgun/types-collection";

import {SearchDto} from "./search";

export class OrderDto<T> extends SearchDto implements IOrderDto<T> {
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
