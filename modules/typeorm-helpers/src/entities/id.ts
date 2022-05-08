import { PrimaryGeneratedColumn } from "typeorm";
import { decorate } from "ts-mixer";

import { IIdBase } from "@gemunion/types-collection";

import { DateBaseEntity } from "./date";

export abstract class IdBaseEntity extends DateBaseEntity implements IIdBase {
  @decorate(PrimaryGeneratedColumn())
  public id: number;
}
