import { Column } from "typeorm";
import { decorate } from "ts-mixer";

import type { IDeployable } from "@gemunion/types-blockchain";

import { IdDateBaseEntity } from "./id-date";

export abstract class DeployableEntity extends IdDateBaseEntity implements IDeployable {
  @decorate(Column({ type: "varchar" }))
  public address: string;

  // EVM
  // The maximum value of Chain ID is 9,223,372,036,854,775,771 ( MAX_CHAIN_ID ).
  // This value is floor(MAX_UINT64 / 2) - 36 , and is chosen to avoid overflow when performing uint64 math.
  // For reference, a value of 0 or less is also disallowed.
  @decorate(Column({ type: "int" }))
  public chainId: number;
}
