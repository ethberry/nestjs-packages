import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum } from "class-validator";

import { ISortDto, SortDirection } from "@gemunion/types-collection";

import { SearchDto } from "./search";

export class SortDto<T> extends SearchDto implements ISortDto<T> {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "typeMismatch" })
  public sortBy: keyof T;

  @ApiPropertyOptional({
    enum: SortDirection,
  })
  @IsOptional()
  @IsEnum({ enum: SortDirection }, { message: "badInput" })
  public sort: SortDirection;
}
