export interface IMessage {
  target: any;
  value: string;
  property: string;
  children: Array<any>;
  constraints: Record<string, string>;
}

export function localizeErrors(messages: Array<IMessage>): any {
  if (messages && messages.length) {
    return messages.reduce(
      (memo: Record<string, string>, message: IMessage) => ({
        ...memo,
        ...{[message.property]: `form.validations.${Object.values(message.constraints)[0]}`},
      }),
      {},
    );
  }
  return void 0;
}
