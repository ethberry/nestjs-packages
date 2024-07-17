import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { Mixin } from "ts-mixer";

import { IParticleDto } from "@gemunion/types-jwt";
import {
  DisplayNameDtoOptionalDto,
  EmailOptionalDto,
  ImageUrlOptionalDto,
  WalletDto,
} from "@gemunion/nest-js-validators";

export class ParticleDto
  extends Mixin(WalletDto, DisplayNameDtoOptionalDto, EmailOptionalDto, ImageUrlOptionalDto)
  implements IParticleDto
{
  @ApiProperty()
  @IsUUID(4, { message: "typeMismatch" })
  public nonce: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public signature: string;
}
