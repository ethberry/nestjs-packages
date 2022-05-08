import { getMetadataArgsStorage, ValueTransformer } from "typeorm";
import { BigNumber } from "ethers";

// Patch BigNumber
Object.defineProperties(BigNumber.prototype, {
  toJSON: {
    value: function (this: BigNumber) {
      return this.toString();
    },
  },
});

export class BigNumberValueTransformer implements ValueTransformer {
  from(data: string | null): BigNumber | null {
    // empty joined columns
    if (data === null) {
      return null;
    }
    return BigNumber.from(data);
  }

  to(data: BigNumber): string {
    return data.toString();
  }
}

export function BigNumberColumn(): PropertyDecorator {
  return function (object, propertyName) {
    getMetadataArgsStorage().columns.push({
      target: object.constructor,
      propertyName: propertyName as string,
      mode: "regular",
      options: {
        type: "numeric",
        transformer: new BigNumberValueTransformer(),
      },
    });
  };
}
