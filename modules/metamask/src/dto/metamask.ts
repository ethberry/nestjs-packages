import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { IMetamaskDto } from "@gemunion/types-jwt";
import { WalletDto } from "@gemunion/collection";

export class MetamaskDto extends WalletDto implements IMetamaskDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public nonce: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public signature: string;
}
