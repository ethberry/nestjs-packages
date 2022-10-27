export interface IInfuraOptions {
  host: string;
  port: number;
  protocol: "https";
  headers: {
    authorization: string;
  };
}
