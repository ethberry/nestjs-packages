export interface IContact {
  IsExcludedFromCampaigns: boolean;
  Name: string;
  CreatedAt: string;
  DeliveredCount: number;
  Email: string;
}

export interface IResponse<TEntity> extends Record<string, unknown> {
  Count: number;
  Total: number;
  Data: Array<TEntity>;
}
