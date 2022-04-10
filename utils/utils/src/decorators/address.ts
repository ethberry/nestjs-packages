import { ApiParam } from "@nestjs/swagger";

export const ApiAddress =
  (name: string): MethodDecorator =>
  (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    ApiParam({ name, type: "string" })(target, propertyKey, descriptor);
  };
