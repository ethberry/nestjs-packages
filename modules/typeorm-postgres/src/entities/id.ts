import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { decorate } from "ts-mixer";

import { IIdBase } from "@ethberry/types-collection";

export abstract class IdBaseEntity extends BaseEntity implements IIdBase {
  @decorate(PrimaryGeneratedColumn())
  public id: number;
}
