import { DynamicModule, Logger, Module } from "@nestjs/common";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { FirebaseModule } from "@gemunion/nest-js-module-firebase";

import { INftStorageOptions } from "./interfaces";
import { NftStorageFirebaseService } from "./storage.service";
import { NFTSTORAGE_OPTIONS_PROVIDER } from "./storage.constants";

@Module({
  imports: [FirebaseModule.deferred()],
  providers: [Logger, NftStorageFirebaseService],
  exports: [NftStorageFirebaseService],
})
export class NftStorageFirebaseModule extends createConfigurableDynamicRootModule<
  NftStorageFirebaseModule,
  INftStorageOptions
>(NFTSTORAGE_OPTIONS_PROVIDER) {
  static deferred = (): Promise<DynamicModule> =>
    NftStorageFirebaseModule.externallyConfigured(NftStorageFirebaseModule, 0);
}