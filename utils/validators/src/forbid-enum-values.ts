import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "ForbidEnumValues" })
export class ForbidEnumValues implements ValidatorConstraintInterface {
  validate(status: string, { constraints = [] }: ValidationArguments) {
    return !constraints.includes(status);
  }

  defaultMessage() {
    return "badInput";
  }
}
