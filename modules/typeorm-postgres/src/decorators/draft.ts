import { getMetadataArgsStorage, ValueTransformer } from "typeorm";
import { getText } from "@gemunion/draft-js-utils";

export class DraftValueTransformer implements ValueTransformer {
  from(data: Record<string, any>) {
    return getText(JSON.stringify(data));
  }

  to(data: string) {
    return data;
  }
}

export function DraftColumn(): PropertyDecorator {
  return function (object, propertyName) {
    getMetadataArgsStorage().columns.push({
      target: object.constructor,
      propertyName: propertyName as string,
      mode: "regular",
      options: {
        type: "json",
        transformer: new DraftValueTransformer(),
      },
    });
  };
}
