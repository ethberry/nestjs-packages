import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface ISdkOptions {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface IS3Options {
  bucket: string;
}

export interface IS3ModuleOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useFactory: (...args: any[]) => Promise<IS3Options & ISdkOptions> | (IS3Options & ISdkOptions);
  inject?: any[];
}
