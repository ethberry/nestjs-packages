import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Mixin } from "ts-mixer";

import { IMetamaskDto } from "@gemunion/types-jwt";
import {
  DisplayNameDtoOptionalDto,
  EmailOptionalDto,
  ImageUrlOptionalDto,
  WalletDto,
} from "@gemunion/nest-js-validators";

export class MetamaskDto
  extends Mixin(DisplayNameDtoOptionalDto, EmailOptionalDto, ImageUrlOptionalDto, WalletDto)
  implements IMetamaskDto
{
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public nonce: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public signature: string;
}
