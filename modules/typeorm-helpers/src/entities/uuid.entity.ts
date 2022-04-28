import { PrimaryGeneratedColumn } from "typeorm";

import { IUuidBase } from "@gemunion/types-collection";

import { DateBaseEntity } from "./date.entity";

export abstract class UuidBaseEntity extends DateBaseEntity implements IUuidBase {
  @PrimaryGeneratedColumn("uuid")
  public uuid: string;
}
