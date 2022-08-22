import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { decorate } from "ts-mixer";

import { IUuidBase } from "@gemunion/types-collection";

export abstract class UuidBaseEntity extends BaseEntity implements IUuidBase {
  @decorate(PrimaryGeneratedColumn("uuid"))
  public uuid: string;
}
