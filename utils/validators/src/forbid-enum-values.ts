import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "ForbidEnumValues" })
export class ForbidEnumValues implements ValidatorConstraintInterface {
  validate(value: string, { constraints = [] }: ValidationArguments) {
    return !constraints.includes(value);
  }

  defaultMessage() {
    return "badInput";
  }
}
