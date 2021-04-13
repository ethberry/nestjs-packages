import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface ISdkOptions {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface ISESOptions {
  from: string;
}

export interface ISESModuleOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useFactory: (...args: any[]) => Promise<ISESOptions & ISdkOptions> | (ISESOptions & ISdkOptions);
  inject?: any[];
}
