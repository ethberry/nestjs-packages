import { getMetadataArgsStorage } from "typeorm";

export function JsonColumn(): (object: any, propertyName: string) => void {
  return function (object: any, propertyName: string) {
    getMetadataArgsStorage().columns.push({
      target: object.constructor,
      propertyName: propertyName,
      mode: "regular",
      options: {
        type: "json",
        transformer: {
          from(val: Record<string, any>) {
            return JSON.stringify(val);
          },
          to(val: string) {
            return JSON.parse(val) as Record<string, any>;
          },
        },
      },
    });
  };
}
