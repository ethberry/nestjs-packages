import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface IAwsOptions {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface ISESOptions {
  from: string;
}

export interface ISESModuleOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useFactory: (...args: any[]) => Promise<ISESOptions & IAwsOptions> | (ISESOptions & IAwsOptions);
  inject?: any[];
}
