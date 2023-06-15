import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import zxcvbn from "zxcvbn";

import { passwordScore } from "@gemunion/constants";

interface IPasswordConstraints {
  score: number;
}

export function IsPassword(
  constraints: Partial<IPasswordConstraints> = {},
  validationOptions: ValidationOptions = { message: "tooWeak" },
): PropertyDecorator {
  return (object: Record<string, any>, propertyName: string | symbol): void => {
    registerDecorator({
      name: "isPassword",
      target: object.constructor,
      propertyName: propertyName as string,
      constraints: [constraints],
      options: validationOptions,
      validator: {
        validate(value: string, { constraints }: ValidationArguments): boolean {
          const { score = passwordScore }: IPasswordConstraints = constraints[0];
          return zxcvbn(value).score >= score;
        },
      },
    });
  };
}
