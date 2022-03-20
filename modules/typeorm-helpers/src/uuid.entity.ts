import { Column, PrimaryGeneratedColumn } from "typeorm";

import { IUuidBase } from "@gemunion/types-collection";

import { DateBaseEntity } from "./date.entity";

export abstract class UuidBaseEntity extends DateBaseEntity implements IUuidBase {
  @Column({ type: "uuid", unique: true })
  @PrimaryGeneratedColumn("uuid")
  public uuid: string;
}
