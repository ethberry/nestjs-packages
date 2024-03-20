import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";
import { decorate } from "ts-mixer";

export class ImageUrlDto {
  @decorate(
    ApiProperty({
      type: String,
    }),
  )
  @decorate(IsUrl({}, { message: "patternMismatch" }))
  @decorate(IsString({ message: "typeMismatch" }))
  public imageUrl: string;
}

export class ImageUrlOptionalDto {
  @decorate(
    ApiPropertyOptional({
      type: String,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsUrl({}, { message: "patternMismatch" }))
  @decorate(IsString({ message: "typeMismatch" }))
  public imageUrl: string;
}
