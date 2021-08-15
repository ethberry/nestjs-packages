import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

interface IBooleanConstraints {
  required: boolean;
  isArray: boolean;
}

@ValidatorConstraint()
class ValidateBoolean implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: unknown, args: ValidationArguments): boolean {
    this.reason = ValidateBoolean.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private static isValid(value: unknown, args: ValidationArguments): string {
    const { required = true, isArray }: IBooleanConstraints = args.constraints[0];

    if (typeof value === "undefined" || (isArray && Array.isArray(value) && value.length === 0)) {
      if (required) {
        return "valueMissing";
      } else {
        return "";
      }
    }

    let message = "";

    if (isArray) {
      if (!Array.isArray(value)) {
        message = "typeMismatch";
      } else {
        for (const e of value) {
          message = this.check(e, args);
          if (message) {
            break;
          }
        }
      }
    } else {
      message = this.check(value, args);
    }

    return message;
  }

  private static check(value: unknown, _args: ValidationArguments): string {
    if (typeof value !== "boolean") {
      return "typeMismatch";
    }

    return "";
  }
}

export function IsBoolean(constraints: Partial<IBooleanConstraints> = {}, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: "isBoolean",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateBoolean,
    });
  };
}
