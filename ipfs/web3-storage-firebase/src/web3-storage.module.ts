import { DynamicModule, Logger, Module } from "@nestjs/common";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { FirebaseModule } from "@ethberry/nest-js-module-firebase";

import { IWeb3StorageOptions } from "./interfaces";
import { Web3StorageFirebaseService } from "./web3-storage.service";
import { WEB3STORAGE_OPTIONS_PROVIDER } from "./web3-storage.constants";

@Module({
  imports: [FirebaseModule.deferred()],
  providers: [Logger, Web3StorageFirebaseService],
  exports: [Web3StorageFirebaseService],
})
export class Web3StorageFirebaseModule extends createConfigurableDynamicRootModule<
  Web3StorageFirebaseModule,
  IWeb3StorageOptions
>(WEB3STORAGE_OPTIONS_PROVIDER) {
  static deferred = (): Promise<DynamicModule> =>
    Web3StorageFirebaseModule.externallyConfigured(Web3StorageFirebaseModule, 0);
}
