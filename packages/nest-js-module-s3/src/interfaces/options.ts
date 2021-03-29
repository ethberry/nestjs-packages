import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface IAwsOptions {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface IS3Options {
  bucket: string;
}

export interface IS3ModuleOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useFactory: (...args: any[]) => Promise<IS3Options & IAwsOptions> | (IS3Options & IAwsOptions);
  inject?: any[];
}
