import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { decorate } from "ts-mixer";

import type { IDateBase, IMuiSortDto, ISortDto } from "@ethberry/types-collection";
import { SortDirection } from "@ethberry/types-collection";

export class SortDto<T extends IDateBase> implements ISortDto<T> {
  @decorate(
    ApiPropertyOptional({
      type: String,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString({ message: "typeMismatch" }))
  public field: keyof T = "createdAt";

  @decorate(
    ApiPropertyOptional({
      enum: SortDirection,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsEnum(SortDirection, { message: "badInput" }))
  public sort: SortDirection = SortDirection.asc;
}

export class MuiSortDto<T extends IDateBase> implements IMuiSortDto<T> {
  @decorate(
    ApiPropertyOptional({
      type: SortDto<T>,
      isArray: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsArray({ message: "typeMismatch" }))
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => SortDto))
  public order: Array<SortDto<T>>;
}
