import {DynamicModule, Logger, Module} from "@nestjs/common";
import {Provider} from "@nestjs/common/interfaces";
import {SES} from "aws-sdk";

import {ISdkOptions, ISesModuleOptions, ISesOptions} from "./interfaces";
import {SesService} from "./ses.service";
import {ProviderType} from "./ses.constants";

@Module({
  providers: [Logger, SesService],
  exports: [SesService],
})
export class SesModule {
  static forRoot(options: ISesOptions & ISdkOptions): DynamicModule {
    const {accessKeyId, secretAccessKey, region, ...rest} = options;

    const optionsProvider: Provider<ISesOptions> = {
      provide: ProviderType.SES_OPTIONS,
      useValue: rest,
    };

    return {
      module: SesModule,
      providers: [
        {
          provide: ProviderType.SES,
          useValue: new SES({accessKeyId, secretAccessKey, region}),
        },
        optionsProvider,
      ],
    };
  }

  static forRootAsync(options: ISesModuleOptions): DynamicModule {
    return {
      module: SesModule,
      imports: options.imports,
      providers: [
        {
          provide: SesService,
          useFactory: async (...args) => {
            const {accessKeyId, secretAccessKey, region, ...rest} = await options.useFactory(...args);
            return new SesService(Logger, new SES({accessKeyId, secretAccessKey, region}), rest);
          },
          inject: options.inject,
        },
      ],
    };
  }
}
