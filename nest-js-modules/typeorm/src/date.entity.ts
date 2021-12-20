import { BaseEntity, BeforeInsert, BeforeUpdate, Column } from "typeorm";

import { IDateBase } from "@gemunion/types-collection";

export abstract class DateBaseEntity extends BaseEntity implements IDateBase {
  @Column({ type: "timestamptz" })
  public createdAt: string;

  @Column({ type: "timestamptz" })
  public updatedAt: string;

  @BeforeInsert()
  public beforeInsert(): void {
    const date = new Date();
    this.createdAt = date.toISOString();
    this.updatedAt = date.toISOString();
  }

  @BeforeUpdate()
  public beforeUpdate(): void {
    const date = new Date();
    this.updatedAt = date.toISOString();
  }
}
