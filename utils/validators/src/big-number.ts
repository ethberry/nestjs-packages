import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { BigNumber } from "ethers";

interface IBigNumberConstraints {
  allowEmptyString?: boolean;
}

export function IsBigNumber(constraints: Partial<IBigNumberConstraints> = {}, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: "isBigNumber",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: {
        validate(value: string, { constraints }: ValidationArguments): boolean {
          const { allowEmptyString }: IBigNumberConstraints = constraints[0];
          if (allowEmptyString && value === "") {
            return true;
          }
          try {
            BigNumber.from(value);
            return true;
          } catch (_e) {
            return false;
          }
        },
      },
    });
  };
}
