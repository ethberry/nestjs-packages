import { BatchTypes } from "@gemunion/types-iex-cloud";

export interface IBatchDto {
  symbols: Array<string>;
  types: Array<BatchTypes>;
  range?: string;
  last?: number;
}
