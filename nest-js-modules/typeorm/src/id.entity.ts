import { PrimaryGeneratedColumn } from "typeorm";

import { IIdBase } from "@gemunion/types-collection";

import { DateBaseEntity } from "./date.entity";

export abstract class IdBaseEntity extends DateBaseEntity implements IIdBase {
  @PrimaryGeneratedColumn()
  public id: number;
}
