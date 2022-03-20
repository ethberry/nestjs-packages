import { ApiBody } from "@nestjs/swagger";

export const ApiFile =
  (fileName = "file"): MethodDecorator =>
  (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    ApiBody({
      type: "multipart/form-data",
      required: true,
      schema: {
        type: "object",
        properties: {
          [fileName]: {
            type: "string",
            format: "binary",
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
