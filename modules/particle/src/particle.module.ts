import { Module } from "@nestjs/common";

import { LicenseModule, licenseProvider } from "@gemunion/nest-js-module-license";

import { ParticleService } from "./particle.service";

@Module({
  imports: [LicenseModule.deferred()],
  providers: [licenseProvider, ParticleService],
  exports: [ParticleService],
})
export class ParticleModule {}
