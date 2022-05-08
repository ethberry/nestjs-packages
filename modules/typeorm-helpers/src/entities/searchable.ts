import { Column } from "typeorm";
import { decorate } from "ts-mixer";

import { ISearchable } from "@gemunion/types-collection";

import { IdBaseEntity } from "./id";
import { JsonColumn } from "../decorators/json";

export abstract class SearchableEntity extends IdBaseEntity implements ISearchable {
  @decorate(Column({ type: "varchar" }))
  public title: string;

  @decorate(JsonColumn())
  public description: string;
}
