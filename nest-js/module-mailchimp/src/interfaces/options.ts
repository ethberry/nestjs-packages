import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface IMailchimpOptions {
  apiKey: string;
  userName: string;
  dc: string;
  from: string;
  name: string;
}

export interface IMailchimpModuleOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory: (...args: any[]) => IMailchimpOptions | Promise<IMailchimpOptions>;
  inject?: any[];
}
