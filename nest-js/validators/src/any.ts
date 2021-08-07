import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { NativeValidation } from "@gemunionstudio/types-validation";

interface IAnyConstraints {
  required: boolean;
}

@ValidatorConstraint()
class ValidateAny implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: unknown, args: ValidationArguments): boolean {
    this.reason = ValidateAny.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private static isValid(value: unknown, args: ValidationArguments): string {
    const { required = true }: IAnyConstraints = args.constraints[0];

    if (typeof value === "undefined") {
      if (required) {
        return NativeValidation.valueMissing;
      } else {
        return "";
      }
    }

    return "";
  }
}

export function IsAny(constraints: Partial<IAnyConstraints> = {}, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: "isAny",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateAny,
    });
  };
}
