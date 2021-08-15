import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

interface INumberConstraints {
  required: boolean;
  isArray: boolean;
  minimum: number;
  maximum: number;
}

@ValidatorConstraint()
class ValidateNumber implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: unknown, args: ValidationArguments): boolean {
    this.reason = ValidateNumber.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private static isValid(value: unknown, args: ValidationArguments): string {
    const { required = true, isArray }: INumberConstraints = args.constraints[0];

    if (
      typeof value === "undefined" ||
      (typeof value === "number" && Number.isNaN(value)) ||
      (isArray && Array.isArray(value) && value.length === 0)
    ) {
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

  private static check(value: unknown, args: ValidationArguments): string {
    const { minimum, maximum }: INumberConstraints = args.constraints[0];

    if (typeof value !== "number") {
      return "typeMismatch";
    }

    if (typeof minimum !== "undefined" && value < minimum) {
      return "rangeUnderflow";
    }

    if (typeof maximum !== "undefined" && value > maximum) {
      return "rangeOverflow";
    }

    return "";
  }
}

export function IsNumber(constraints: Partial<INumberConstraints> = {}, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: "isNumber",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateNumber,
    });
  };
}
