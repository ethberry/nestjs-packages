import { Column } from "typeorm";
import { decorate } from "ts-mixer";

import { ISearchable } from "@gemunion/types-collection";

import { IdDateBaseEntity } from "./id-date";
import { JsonColumn } from "../decorators/json";

export abstract class SearchableEntity extends IdDateBaseEntity implements ISearchable {
  @decorate(Column({ type: "varchar" }))
  public title: string;

  @decorate(JsonColumn())
  public description: string;
}
