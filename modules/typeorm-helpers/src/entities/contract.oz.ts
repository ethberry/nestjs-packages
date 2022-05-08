import { Column } from "typeorm";
import { decorate } from "ts-mixer";

import { IOzContract, OzPermissionType } from "@gemunion/types-collection";

import { ContractBaseEntity } from "./contract";

export abstract class OzContractBaseEntity extends ContractBaseEntity implements IOzContract {
  @decorate(
    Column({
      type: "enum",
      enum: OzPermissionType,
    }),
  )
  public permissionType: OzPermissionType;
}
