import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { IWalletConnectDto } from "@gemunion/types-jwt";
import { WalletDto } from "@gemunion/nest-js-validators";

export class WalletConnectDto extends WalletDto implements IWalletConnectDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public nonce: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public signature: string;
}
