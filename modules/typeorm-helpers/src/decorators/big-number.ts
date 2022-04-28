import { getMetadataArgsStorage } from "typeorm";
import { BigNumber } from "ethers";

// Patch BigNumber
Object.defineProperties(BigNumber.prototype, {
  toJSON: {
    value: function (this: BigNumber) {
      return this.toString();
    },
  },
});

export function BigNumberColumn(): (object: any, propertyName: string) => void {
  return function (object: any, propertyName: string) {
    getMetadataArgsStorage().columns.push({
      target: object.constructor,
      propertyName: propertyName,
      mode: "regular",
      options: {
        type: "numeric",
        transformer: {
          from(data: string): BigNumber {
            return BigNumber.from(data);
          },
          to(data: BigNumber): string {
            return data.toString();
          },
        },
      },
    });
  };
}
