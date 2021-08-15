import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

interface IStringConstraints {
  required: boolean;
  isArray: boolean;
  minLength: number;
  maxLength: number;
  regexp: RegExp;
  enum: any;
}

@ValidatorConstraint()
class ValidateString implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: unknown, args: ValidationArguments): boolean {
    this.reason = ValidateString.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private static isValid(value: unknown, args: ValidationArguments): string {
    const { required = true, isArray }: IStringConstraints = args.constraints[0];

    if (
      typeof value === "undefined" ||
      (typeof value === "string" && value === "") ||
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
    const { minLength, maxLength, regexp, enum: type }: IStringConstraints = args.constraints[0];

    if (typeof value !== "string") {
      return "typeMismatch";
    }

    if (typeof minLength !== "undefined" && value.length < minLength) {
      return "tooShort";
    }

    if (typeof maxLength !== "undefined" && value.length > maxLength) {
      return "tooLong";
    }

    if (typeof regexp !== "undefined" && !regexp.test(value)) {
      return "patternMismatch";
    }

    if (type && !Object.values(type).includes(value)) {
      return "badInput";
    }

    return "";
  }
}

export function IsString(constraints: Partial<IStringConstraints> = {}, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: "isString",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateString,
    });
  };
}
