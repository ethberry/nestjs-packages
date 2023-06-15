import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

interface IConfirmConstraints {
  relatedPropertyName: string;
}

export function IsConfirm(
  constraints: Partial<IConfirmConstraints> = {},
  validationOptions: ValidationOptions = { message: "passwordMismatch" },
): PropertyDecorator {
  return (object: Record<string, any>, propertyName: string | symbol): void => {
    registerDecorator({
      name: "isConfirm",
      target: object.constructor,
      propertyName: propertyName as string,
      constraints: [constraints],
      options: validationOptions,
      validator: {
        validate(value: unknown, { constraints, object }: ValidationArguments): boolean {
          const { relatedPropertyName = "password" }: IConfirmConstraints = constraints[0];
          const relatedValue = (object as any)[relatedPropertyName];
          return relatedValue === value;
        },
      },
    });
  };
}
