import { BaseEntity, BeforeInsert, BeforeUpdate, Column } from "typeorm";
import { decorate } from "ts-mixer";

import { IDateBase } from "@gemunion/types-collection";

export abstract class DateBaseEntity extends BaseEntity implements IDateBase {
  @decorate(Column({ type: "timestamptz" }))
  public createdAt: string;

  @decorate(Column({ type: "timestamptz" }))
  public updatedAt: string;

  @decorate(BeforeInsert())
  public beforeInsert(): void {
    const date = new Date();
    this.createdAt = date.toISOString();
    this.updatedAt = date.toISOString();
  }

  @decorate(BeforeUpdate())
  public beforeUpdate(): void {
    const date = new Date();
    this.updatedAt = date.toISOString();
  }
}
