import {DynamicModule, Module} from "@nestjs/common";
import {Provider} from "@nestjs/common/interfaces";
import {SES} from "aws-sdk";

import {IAwsOptions, ISESModuleOptions, ISESOptions} from "./interfaces";
import {SesService} from "./ses.service";
import {ProviderType} from "./ses.constants";

@Module({
  providers: [SesService],
  exports: [SesService],
})
export class SesModule {
  static forRoot(options: ISESOptions & IAwsOptions): DynamicModule {
    const {accessKeyId, secretAccessKey, region, ...rest} = options;

    const optionsProvider: Provider<ISESOptions> = {
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

  static forRootAsync(options: ISESModuleOptions): DynamicModule {
    return {
      module: SesModule,
      imports: options.imports,
      providers: [
        {
          provide: SesService,
          useFactory: async (...args) => {
            const {accessKeyId, secretAccessKey, region, ...rest} = await options.useFactory(...args);
            return new SesService(new SES({accessKeyId, secretAccessKey, region}), rest);
          },
          inject: options.inject,
        },
      ],
    };
  }
}
