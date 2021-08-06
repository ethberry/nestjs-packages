import { ModuleMetadata } from "@nestjs/common/interfaces";

export interface IMailjetOptions {
  publicKey: string;
  privateKey: string;
  from: string;
  name: string;
}

export interface IMailjetModuleOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useFactory: (...args: any[]) => IMailjetOptions | Promise<IMailjetOptions>;
  inject?: any[];
}
