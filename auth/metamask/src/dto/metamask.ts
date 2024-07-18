import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

import { IMetamaskDto } from "@gemunion/types-jwt";
import { WalletDto } from "@gemunion/nest-js-validators";

export class MetamaskDto extends WalletDto implements IMetamaskDto {
  @ApiProperty()
  @IsUUID(4, { message: "patternMismatch" })
  public nonce: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public signature: string;
}
