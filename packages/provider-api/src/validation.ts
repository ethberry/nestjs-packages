// https://github.com/typestack/class-validator/blob/develop/src/validation/ValidationError.ts

export interface IValidationError {
  target: any;
  value: string;
  property: string;
  children: Array<any>;
  constraints: Record<string, string>;
}

export function localizeErrors(messages: Array<IValidationError>): Record<string, string> {
  return messages.reduce(
    (memo: Record<string, string>, message: IValidationError) => ({
      ...memo,
      ...{[message.property]: `form.validations.${Object.values(message.constraints)[0]}`},
    }),
    {},
  );
}
