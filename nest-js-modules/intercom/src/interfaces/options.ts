import { ModuleMetadata } from "@nestjs/common/interfaces";

export interface IIntercomOptions {}

export interface IMailchimpModuleOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory: (...args: any[]) => IIntercomOptions | Promise<IIntercomOptions>;
  inject?: any[];
}
