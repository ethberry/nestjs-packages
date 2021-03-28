import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import {NativeValidation} from "@trejgun/types-validation";

interface IConfirmConstraints {
  required: boolean;
  relatedPropertyName: string;
}

@ValidatorConstraint()
class ValidateConfirm implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: unknown, args: ValidationArguments): boolean {
    this.reason = ValidateConfirm.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private static isValid(value: unknown, args: ValidationArguments): string {
    const {required = true, relatedPropertyName = "password"}: IConfirmConstraints = args.constraints[0];

    const relatedValue = (args.object as any)[relatedPropertyName];

    if (typeof value === "undefined" || value === "") {
      if (required) {
        return NativeValidation.valueMissing;
      } else {
        return "";
      }
    }

    if (typeof value !== "string") {
      return NativeValidation.typeMismatch;
    }

    if (relatedValue !== value) {
      return NativeValidation.badInput;
    }

    return "";
  }
}

export function IsConfirm(constraints: Partial<IConfirmConstraints> = {}, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: "isConfirm",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateConfirm,
    });
  };
}
