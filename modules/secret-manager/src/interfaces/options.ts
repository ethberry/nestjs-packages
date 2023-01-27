export interface ISdkOptions {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface ISecretManagerOptions extends ISdkOptions {}
