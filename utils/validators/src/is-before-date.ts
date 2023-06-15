import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

interface IBeforeDateConstraints {
  relatedPropertyName: string;
}

export function IsBeforeDate(
  constraints: Partial<IBeforeDateConstraints> = {},
  validationOptions: ValidationOptions = { message: "badInput" },
): PropertyDecorator {
  return (object: Record<string, any>, propertyName: string | symbol): void => {
    registerDecorator({
      name: "isBefore",
      target: object.constructor,
      propertyName: propertyName as string,
      constraints: [constraints],
      options: validationOptions,
      validator: {
        validate(value: string, { constraints, object }: ValidationArguments): boolean {
          const { relatedPropertyName }: IBeforeDateConstraints = constraints[0];
          const relatedValue = (object as any)[relatedPropertyName];
          return new Date(value) < new Date(relatedValue);
        },
      },
    });
  };
}
