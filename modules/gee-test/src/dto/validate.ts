import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { IGeeTestDto, IValidateDto } from "../interfaces";
import { GeeCaptcha } from "../geetest.validator";

export class GeeTestDto implements IGeeTestDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public challenge: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public validate: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public seccode: string;
}

export class ValidateDto implements IValidateDto {
  @ApiProperty({ type: () => GeeTestDto })
  @GeeCaptcha()
  public geetest: IGeeTestDto;
}
