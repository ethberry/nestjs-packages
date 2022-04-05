import { ApiBody } from "@nestjs/swagger";

export const ApiMetamaskLogin =
  (): MethodDecorator =>
  (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    ApiBody({
      schema: {
        type: "object",
        properties: {
          nonce: {
            type: "string",
          },
          signature: {
            type: "string",
          },
          wallet: {
            type: "string",
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
