import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEthereumAddress, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { decorate } from "ts-mixer";

export class AccountDto {
  @decorate(
    ApiProperty({
      type: String,
    }),
  )
  @decorate(IsString({ message: "typeMismatch" }))
  @decorate(IsEthereumAddress({ message: "patternMismatch" }))
  @decorate(Transform(({ value }: { value: string }) => value.toLowerCase()))
  public account: string;
}

export class AccountOptionalDto {
  @decorate(
    ApiPropertyOptional({
      type: String,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString({ message: "typeMismatch" }))
  @decorate(IsEthereumAddress({ message: "patternMismatch" }))
  @decorate(Transform(({ value }: { value: string }) => (value === "" ? null : value.toLowerCase())))
  public account: string;
}

export class AddressDto {
  @decorate(
    ApiProperty({
      type: String,
    }),
  )
  @decorate(IsString({ message: "typeMismatch" }))
  @decorate(IsEthereumAddress({ message: "patternMismatch" }))
  @decorate(Transform(({ value }: { value: string }) => value.toLowerCase()))
  public address: string;
}

export class AddressOptionalDto {
  @decorate(
    ApiPropertyOptional({
      type: String,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString({ message: "typeMismatch" }))
  @decorate(IsEthereumAddress({ message: "patternMismatch" }))
  @decorate(Transform(({ value }: { value: string }) => (value === "" ? null : value.toLowerCase())))
  public address: string;
}

export class ReferrerDto {
  @decorate(
    ApiProperty({
      type: String,
    }),
  )
  @decorate(IsString({ message: "typeMismatch" }))
  @decorate(IsEthereumAddress({ message: "patternMismatch" }))
  @decorate(Transform(({ value }: { value: string }) => value.toLowerCase()))
  public referrer: string;
}

export class ReferrerOptionalDto {
  @decorate(
    ApiPropertyOptional({
      type: String,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString({ message: "typeMismatch" }))
  @decorate(IsEthereumAddress({ message: "patternMismatch" }))
  @decorate(Transform(({ value }: { value: string }) => (value === "" ? null : value.toLowerCase())))
  public referrer: string;
}

export class WalletDto {
  @decorate(
    ApiProperty({
      type: String,
    }),
  )
  @decorate(IsString({ message: "typeMismatch" }))
  @decorate(IsEthereumAddress({ message: "patternMismatch" }))
  @decorate(Transform(({ value }: { value: string }) => value.toLowerCase()))
  public wallet: string;
}

export class WalletOptionalDto {
  @decorate(
    ApiPropertyOptional({
      type: String,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString({ message: "typeMismatch" }))
  @decorate(IsEthereumAddress({ message: "patternMismatch" }))
  @decorate(Transform(({ value }: { value: string }) => (value === "" ? null : value.toLowerCase())))
  public wallet: string;
}
