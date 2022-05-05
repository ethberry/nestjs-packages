import { Column } from "typeorm";

import { ISearchable } from "@gemunion/types-collection";

import { IdBaseEntity } from "./id";
import { JsonColumn } from "../decorators/json";

export abstract class SearchableEntity extends IdBaseEntity implements ISearchable {
  @Column({ type: "varchar" })
  public title: string;

  @JsonColumn()
  public description: string;
}
