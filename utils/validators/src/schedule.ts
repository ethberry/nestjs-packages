import { ApiProperty } from "@nestjs/swagger";
import { CronExpression } from "@nestjs/schedule";
import { IsEnum, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { decorate } from "ts-mixer";

export class ScheduleDto {
  @decorate(
    ApiProperty({
      enum: CronExpression,
    }),
  )
  @decorate(Transform(({ value }) => value as CronExpression))
  @decorate(IsEnum(CronExpression, { message: "badInput" }))
  public schedule: CronExpression;
}

export class ScheduleOptionalDto {
  @decorate(
    ApiProperty({
      enum: CronExpression,
    }),
  )
  @decorate(IsOptional())
  @decorate(Transform(({ value }) => value as CronExpression))
  @decorate(IsEnum(CronExpression, { message: "badInput" }))
  public schedule: CronExpression;
}
