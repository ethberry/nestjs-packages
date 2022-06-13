export interface IContact {
  IsExcludedFromCampaigns: boolean;
  Name: string;
  CreatedAt: string;
  DeliveredCount: number;
  Email: string;
}

export type TResponse<TEntity> = {
  Count: number;
  Total: number;
  Data: Array<TEntity>;
};
