import { DynamicModule, Module } from "@nestjs/common";
import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";

import { LicenseModule, licenseProvider } from "@ethberry/nest-js-module-license";

import { IFirebaseOptions } from "./interfaces";
import { FirebaseService } from "./firebase.service";
import { FIREBASE_OPTIONS_PROVIDER } from "./firebase.constants";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [FirebaseService, licenseProvider],
  exports: [FirebaseService],
})
export class FirebaseModule extends createConfigurableDynamicRootModule<FirebaseModule, IFirebaseOptions>(
  FIREBASE_OPTIONS_PROVIDER,
) {
  static deferred = (): Promise<DynamicModule> => FirebaseModule.externallyConfigured(FirebaseModule, 0);
}
