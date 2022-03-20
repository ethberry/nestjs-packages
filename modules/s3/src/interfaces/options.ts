export interface ISdkOptions {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface IS3Options extends ISdkOptions {
  bucket: string;
}
