import { Column } from "typeorm";
import { decorate } from "ts-mixer";

import { IContract } from "@gemunion/types-collection";

import { IdDateBaseEntity } from "./id-date";

export abstract class ContractBaseEntity extends IdDateBaseEntity implements IContract {
  @decorate(Column({ type: "varchar" }))
  public address: string;

  @decorate(Column({ type: "int" }))
  public chainId: number;
}
