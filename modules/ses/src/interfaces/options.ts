export interface ISdkOptions {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface ISesOptions extends ISdkOptions {
  from: string;
}
