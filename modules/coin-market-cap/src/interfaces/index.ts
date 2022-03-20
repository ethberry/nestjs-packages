export interface ICmcQuote {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
}

export interface ICmcData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: Array<string>;
  max_supply: null;
  circulating_supply: number;
  total_supply: number;
  platform: null;
  cmc_rank: number;
  last_updated: string;
  quote: Record<string, ICmcQuote>;
}

export interface ICmcResponse {
  status: number;
  data: Array<ICmcData>;
}
