import { Column } from "typeorm";
import { decorate } from "ts-mixer";

import { IContract } from "@gemunion/types-collection";

import { IdBaseEntity } from "./id";

export abstract class ContractBaseEntity extends IdBaseEntity implements IContract {
  @decorate(Column({ type: "varchar" }))
  public address: string;
}
