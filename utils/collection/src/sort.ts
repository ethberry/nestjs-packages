import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum } from "class-validator";

import { ISortDto, SortDirection, IDateBase } from "@gemunion/types-collection";

import { SearchDto } from "./search";

export class SortDto<T extends IDateBase> extends SearchDto implements ISortDto<T> {
  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString({ message: "typeMismatch" })
  public sortBy: keyof T = "createdAt";

  @ApiPropertyOptional({
    enum: SortDirection,
  })
  @IsOptional()
  @IsEnum(SortDirection, { message: "badInput" })
  public sort: SortDirection = SortDirection.asc;
}
