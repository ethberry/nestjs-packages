import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface ISdkOptions {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface ISesOptions {
  from: string;
}

export interface ISesModuleOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useFactory: (...args: any[]) => Promise<ISesOptions & ISdkOptions> | (ISesOptions & ISdkOptions);
  inject?: any[];
}
