import { Mixin } from "ts-mixer";

import { IUuidDateBase } from "@ethberry/types-collection";

import { UuidBaseEntity } from "./uuid";
import { DateBaseEntity } from "./date";

export abstract class UuidDateBaseEntity extends Mixin(UuidBaseEntity, DateBaseEntity) implements IUuidDateBase {}
