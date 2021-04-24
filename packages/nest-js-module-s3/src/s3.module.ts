import {DynamicModule, Module} from "@nestjs/common";
import {Provider} from "@nestjs/common/interfaces";
import {S3} from "aws-sdk";

import {ISdkOptions, IS3ModuleOptions, IS3Options} from "./interfaces";
import {S3Controller} from "./s3.controller";
import {S3Service} from "./s3.service";
import {ProviderType} from "./s3.constants";

@Module({
  controllers: [S3Controller],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {
  static forRoot(options: IS3Options & ISdkOptions): DynamicModule {
    const {accessKeyId, secretAccessKey, region, ...rest} = options;

    const optionsProvider: Provider<IS3Options> = {
      provide: ProviderType.S3_OPTIONS,
      useValue: rest,
    };

    return {
      module: S3Module,
      providers: [
        {
          provide: ProviderType.S3,
          useValue: new S3({accessKeyId, secretAccessKey, region}),
        },
        optionsProvider,
      ],
    };
  }

  static forRootAsync(options: IS3ModuleOptions): DynamicModule {
    return {
      module: S3Module,
      imports: options.imports,
      providers: [
        {
          provide: S3Service,
          useFactory: async (...args) => {
            const {accessKeyId, secretAccessKey, region, ...rest} = await options.useFactory(...args);
            return new S3Service(new S3({accessKeyId, secretAccessKey, region}), rest);
          },
          inject: options.inject,
        },
      ],
    };
  }
}
