import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEthereumAddress, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { decorate } from "ts-mixer";

const applyDecorators = function (decorators: Array<PropertyDecorator>, target: any, key: string) {
  decorators.forEach(decorator => decorator(target, key));
};

export const createCustomAddressDto = (field: string, decorators: Array<PropertyDecorator>) => {
  class CustomAddressDto {
    // [k: string]: any;
  }

  applyDecorators(decorators, CustomAddressDto.prototype, field);

  return CustomAddressDto;
};

const requiredDecorators = [
  decorate(
    ApiProperty({
      type: String,
    }),
  ),
  decorate(IsString({ message: "typeMismatch" })),
  decorate(IsEthereumAddress({ message: "patternMismatch" })),
  decorate(Transform(({ value }: { value: string }) => value.toLowerCase())),
];

const optionalDecorators = [
  decorate(
    ApiPropertyOptional({
      type: String,
    }),
  ),
  decorate(IsOptional()),
  decorate(IsString({ message: "typeMismatch" })),
  decorate(IsEthereumAddress({ message: "patternMismatch" })),
  decorate(Transform(({ value }: { value: string }) => (value === "" ? null : value.toLowerCase()))),
];

export const AccountDto = createCustomAddressDto("account", requiredDecorators);
export const AccountOptionalDto = createCustomAddressDto("account", optionalDecorators);

export const AddressDto = createCustomAddressDto("address", requiredDecorators);
export const AddressOptionalDto = createCustomAddressDto("address", optionalDecorators);

export const ReferrerDto = createCustomAddressDto("referrer", requiredDecorators);
export const ReferrerOptionalDto = createCustomAddressDto("referrer", optionalDecorators);

export const WalletDto = createCustomAddressDto("wallet", requiredDecorators);
export const WalletOptionalDto = createCustomAddressDto("wallet", optionalDecorators);
