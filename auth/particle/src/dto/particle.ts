import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { Mixin } from "ts-mixer";

import { IParticleDto } from "@ethberry/types-jwt";
import {
  DisplayNameDtoOptionalDto,
  EmailOptionalDto,
  ImageUrlOptionalDto,
  WalletDto,
} from "@ethberry/nest-js-validators";

export class ParticleDto
  extends Mixin(WalletDto, DisplayNameDtoOptionalDto, EmailOptionalDto, ImageUrlOptionalDto)
  implements IParticleDto
{
  @ApiProperty()
  @IsUUID(4, { message: "patternMismatch" })
  public nonce: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public signature: string;
}
