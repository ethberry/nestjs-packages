import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

import { IMetamaskDto } from "@ethberry/types-jwt";
import { WalletDto } from "@ethberry/nest-js-validators";

export class MetamaskDto extends WalletDto implements IMetamaskDto {
  @ApiProperty()
  @IsUUID(4, { message: "patternMismatch" })
  public nonce: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public signature: string;
}
