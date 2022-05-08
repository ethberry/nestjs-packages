import { PrimaryGeneratedColumn } from "typeorm";
import { decorate } from "ts-mixer";

import { IUuidBase } from "@gemunion/types-collection";

import { DateBaseEntity } from "./date";

export abstract class UuidBaseEntity extends DateBaseEntity implements IUuidBase {
  @decorate(PrimaryGeneratedColumn("uuid"))
  public uuid: string;
}
