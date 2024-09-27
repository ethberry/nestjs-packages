import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

interface IBigIntConstraints {
  minimum: bigint | number;
  maximum: bigint | number;
}

@ValidatorConstraint({ name: "isBigInt" })
export class ValidateBigInt implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: unknown, args: ValidationArguments): boolean {
    this.reason = this.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private isValid(value: unknown, args: ValidationArguments): string {
    const { minimum, maximum }: IBigIntConstraints = args.constraints[0];

    if (value === "") {
      return "typeMismatch";
    }

    let bn;
    try {
      bn = BigInt(value as any);
    } catch (e) {
      void e;
      return "typeMismatch";
    }

    if (minimum !== void 0) {
      if (bn < minimum) {
        return "rangeUnderflow";
      }
    }

    if (maximum !== void 0) {
      if (bn > maximum) {
        return "rangeOverflow";
      }
    }

    return "";
  }
}

export function IsBigInt(
  constraints: Partial<IBigIntConstraints> = {},
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: Record<string, any>, propertyName: string | symbol): void => {
    registerDecorator({
      name: "isBigInt",
      target: object.constructor,
      propertyName: propertyName as string,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateBigInt,
    });
  };
}
