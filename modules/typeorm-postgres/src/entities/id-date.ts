import { Mixin } from "ts-mixer";

import { IIdDateBase } from "@ethberry/types-collection";

import { IdBaseEntity } from "./id";
import { DateBaseEntity } from "./date";

export abstract class IdDateBaseEntity extends Mixin(IdBaseEntity, DateBaseEntity) implements IIdDateBase {}
