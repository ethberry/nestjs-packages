import {HttpService, Inject, Injectable, Logger, LoggerService} from "@nestjs/common";

import {IMandrillOptions, IMandrillSendFields} from "./interfaces";
import {ProviderType} from "./mandrill.constants";

@Injectable()
export class MandrillService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(ProviderType.MANDRILL_OPTIONS)
    private readonly options: IMandrillOptions,
  ) {}

  public sendEmail(mail: IMandrillSendFields): Promise<{status: boolean}> {
    return this.httpService
      .request({
        method: "post",
        url: `https://mandrillapp.com/api/1.0/messages/send`,
        data: {
          key: this.options.apiKey,
          message: {
            html: mail.html,
            subject: mail.subject,
            from_email: this.options.from,
            from_name: this.options.name,
            to: mail.to,
          },
        },
      })
      .toPromise()
      .then(() => {
        return {status: true};
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, MandrillService.name);
        return {status: false};
      });
  }
}
