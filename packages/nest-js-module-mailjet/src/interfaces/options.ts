import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface ISdkOptions {
  publicKey: string;
  privateKey: string;
}

export interface IMailjetOptions {
  from: string;
  name: string;
}

export interface IMailjetModuleOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useFactory: (...args: any[]) => Promise<IMailjetOptions & ISdkOptions> | (IMailjetOptions & ISdkOptions);
  inject?: any[];
}
