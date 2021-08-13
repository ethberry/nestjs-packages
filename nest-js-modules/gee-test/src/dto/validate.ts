import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "@gemunion/nest-js-validators";

import { IGeeTestDto, IValidateDto } from "../interfaces";
import { GeeCaptcha } from "../geetest.validator";

export class GeeTestDto implements IGeeTestDto {
  @ApiProperty()
  @IsString()
  public challenge: string;

  @ApiProperty()
  @IsString()
  public validate: string;

  @ApiProperty()
  @IsString()
  public seccode: string;
}

export class ValidateDto implements IValidateDto {
  @ApiProperty({ type: () => GeeTestDto })
  @GeeCaptcha()
  public geetest: IGeeTestDto;
}
