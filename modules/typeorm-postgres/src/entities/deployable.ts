import { Column } from "typeorm";
import { decorate } from "ts-mixer";

import { IDeployable } from "@gemunion/types-collection";

import { IdDateBaseEntity } from "./id-date";

export abstract class DeployableEntity extends IdDateBaseEntity implements IDeployable {
  @decorate(Column({ type: "varchar" }))
  public address: string;

  @decorate(Column({ type: "int" }))
  public chainId: number;
}
