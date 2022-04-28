import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEthereumAddress } from "class-validator";
import { Transform } from "class-transformer";

import { IMetamaskDto } from "@gemunion/types-jwt";

export class MetamaskDto implements IMetamaskDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public nonce: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public signature: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  @IsEthereumAddress({ message: "patternMismatch" })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  public wallet: string;
}
