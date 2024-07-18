import { ApiProperty } from "@nestjs/swagger";
import { StdSignature } from "@keplr-wallet/types";
import { IsString, IsUUID} from "class-validator";

import { IKeplrDto } from "@gemunion/types-jwt";

export class KeplrDto implements IKeplrDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public chainPrefix: string;

  @ApiProperty()
  @IsUUID(4, { message: "patternMismatch" })
  public nonce: string;

  @ApiProperty()
  public signature: StdSignature;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public wallet: string;
}
