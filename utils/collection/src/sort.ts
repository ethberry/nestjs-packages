import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { decorate } from "ts-mixer";

import { IDateBase, ISortDto, SortDirection } from "@gemunion/types-collection";

export class SortDto<T extends IDateBase> implements ISortDto<T> {
  @decorate(
    ApiPropertyOptional({
      type: String,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString({ message: "typeMismatch" }))
  public sortBy: keyof T = "createdAt";

  @decorate(
    ApiPropertyOptional({
      enum: SortDirection,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsEnum(SortDirection, { message: "badInput" }))
  public sort: SortDirection = SortDirection.asc;
}
