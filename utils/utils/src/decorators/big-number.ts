import { ApiParam } from "@nestjs/swagger";

export const ApiBigNumber =
  (name: string): MethodDecorator =>
  (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    ApiParam({ name, type: "number", format: "BigNumber" })(target, propertyKey, descriptor);
  };
