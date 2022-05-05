import { PrimaryGeneratedColumn } from "typeorm";

import { IIdBase } from "@gemunion/types-collection";

import { DateBaseEntity } from "./date";

export abstract class IdBaseEntity extends DateBaseEntity implements IIdBase {
  @PrimaryGeneratedColumn()
  public id: number;
}
