import { Column } from "typeorm";

import { IOzContract, OzPermissionType } from "@gemunion/types-collection";

import { SearchableEntity } from "./searchable";

export abstract class OzContractBaseEntity extends SearchableEntity implements IOzContract {
  @Column({
    type: "enum",
    enum: OzPermissionType,
  })
  public permissionType: OzPermissionType;

  @Column({ type: "varchar" })
  public address: string;
}
