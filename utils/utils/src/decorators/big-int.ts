import { ApiParam } from "@nestjs/swagger";

export const ApiBigInt =
  (name: string): MethodDecorator =>
  (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    ApiParam({ name, type: "number", format: "BigInt" })(target, propertyKey, descriptor);
  };
