import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";
import { decorate } from "ts-mixer";

import { IPaginationDto } from "@ethberry/types-collection";
import { defaultItemsPerPage } from "@ethberry/constants";

export class PaginationDto implements IPaginationDto {
  @decorate(
    ApiPropertyOptional({
      type: Number,
      default: 0,
      minimum: 0,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsInt({ message: "typeMismatch" }))
  @decorate(Min(0, { message: "rangeUnderflow" }))
  @decorate(Type(() => Number))
  public skip = 0;

  @decorate(
    ApiPropertyOptional({
      type: Number,
      minimum: 1,
      default: defaultItemsPerPage,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsInt({ message: "typeMismatch" }))
  @decorate(Min(0, { message: "rangeUnderflow" }))
  @decorate(Type(() => Number))
  public take = defaultItemsPerPage;
}
