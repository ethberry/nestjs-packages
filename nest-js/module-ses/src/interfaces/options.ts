import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface ISesOptions {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  from: string;
}

export interface ISesModuleOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useFactory: (...args: any[]) => ISesOptions | Promise<ISesOptions>;
  inject?: any[];
}
