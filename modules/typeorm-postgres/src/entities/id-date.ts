import { Mixin } from "ts-mixer";

import { IIdDateBase } from "@gemunion/types-collection";

import { IdBaseEntity } from "./id";
import { DateBaseEntity } from "./date";

export abstract class IdDateBaseEntity extends Mixin(IdBaseEntity, DateBaseEntity) implements IIdDateBase {}