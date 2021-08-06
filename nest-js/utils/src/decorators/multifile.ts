import { ApiBody } from "@nestjs/swagger";

export const ApiMultiFile =
  (fileName = "files"): MethodDecorator =>
  (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    ApiBody({
      type: "multipart/form-data",
      required: true,
      schema: {
        type: "object",
        properties: {
          [fileName]: {
            type: "array",
            items: {
              type: "string",
              format: "binary",
            },
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
