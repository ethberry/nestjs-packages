import {DynamicModule, Logger, Module} from "@nestjs/common";
import {Provider} from "@nestjs/common/interfaces";
import {connect} from "node-mailjet";

import {IMailjetModuleOptions, IMailjetOptions, ISdkOptions} from "./interfaces";
import {MailjetService} from "./mailjet.service";
import {ProviderType} from "./mailjet.constants";

@Module({
  providers: [Logger, MailjetService],
  exports: [MailjetService],
})
export class MailjetModule {
  static forRoot(options: IMailjetOptions & ISdkOptions): DynamicModule {
    const {publicKey, privateKey, ...rest} = options;

    const optionsProvider: Provider<IMailjetOptions> = {
      provide: ProviderType.MAILJET_OPTIONS,
      useValue: rest,
    };

    return {
      module: MailjetModule,
      providers: [
        {
          provide: ProviderType.MAILJET,
          useValue: connect(publicKey, privateKey),
        },
        optionsProvider,
      ],
    };
  }

  static forRootAsync(options: IMailjetModuleOptions): DynamicModule {
    return {
      module: MailjetModule,
      imports: options.imports,
      providers: [
        {
          provide: MailjetService,
          inject: options.inject,
          useFactory: async (...args) => {
            const {publicKey, privateKey, ...rest} = await options.useFactory(...args);
            return new MailjetService(Logger, connect(publicKey, privateKey), rest);
          },
        },
      ],
    };
  }
}
