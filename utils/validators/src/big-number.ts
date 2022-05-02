import { registerDecorator, ValidationOptions } from "class-validator";
import { BigNumber } from "ethers";

export function IsBigNumber(validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: "isBigNumber",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
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
