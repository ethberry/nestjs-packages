import {ModuleMetadata} from "@nestjs/common/interfaces";

export interface IMandrillOptions {
  apiKey: string;
  userName: string;
  dc: string;
  from: string;
  name: string;
}

export interface IMailchimpModuleOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory: (...args: any[]) => IMandrillOptions | Promise<IMandrillOptions>;
  inject?: any[];
}
