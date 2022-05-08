import { getMetadataArgsStorage, ValueTransformer } from "typeorm";

export class JsonValueTransformer implements ValueTransformer {
  from(data: Record<string, any>) {
    return JSON.stringify(data);
  }

  to(data: string) {
    return JSON.parse(data) as Record<string, any>;
  }
}

export function JsonColumn(): PropertyDecorator {
  return function (object, propertyName) {
    getMetadataArgsStorage().columns.push({
      target: object.constructor,
      propertyName: propertyName as string,
      mode: "regular",
      options: {
        type: "json",
        transformer: new JsonValueTransformer(),
      },
    });
  };
}
