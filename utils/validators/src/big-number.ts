import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { BigNumber } from "ethers";

interface IBigNumberConstraints {
  allowEmptyString?: boolean;
  minimum: string;
  maximum: string;
}

@ValidatorConstraint({ name: "isBigNumber" })
export class ValidateBigNumber implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: unknown, args: ValidationArguments): boolean {
    this.reason = this.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private isValid(value: unknown, args: ValidationArguments): string {
    const { allowEmptyString, minimum, maximum }: IBigNumberConstraints = args.constraints[0];

    if (allowEmptyString && value === "") {
      return "";
    }

    let bn;
    try {
      bn = BigNumber.from(value);
    } catch (_e) {
      return "typeMismatch";
    }

    if (minimum !== void 0) {
      if (bn.lt(minimum)) {
        return "rangeUnderflow";
      }
    }

    if (maximum !== void 0) {
      if (bn.gt(maximum)) {
        return "rangeOverflow";
      }
    }

    return "";
  }
}

export function IsBigNumber(constraints: Partial<IBigNumberConstraints> = {}, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: "isBigNumber",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateBigNumber,
    });
  };
}
