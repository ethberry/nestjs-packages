import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

import { IEmailResult, ISendEmailDto, ISendMailService } from "@gemunionstudio/types-email";

import { IMandrillOptions } from "./interfaces";
import { MANDRILL_OPTIONS_PROVIDER } from "./mandrill.constants";
import { firstValueFrom } from "rxjs";

@Injectable()
export class MandrillService implements ISendMailService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(MANDRILL_OPTIONS_PROVIDER)
    private readonly options: IMandrillOptions,
  ) {}

  public sendEmail(mail: ISendEmailDto): Promise<IEmailResult> {
    const response = this.httpService.request({
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
    });

    return firstValueFrom(response)
      .then(() => {
        return { status: true };
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, MandrillService.name);
        return { status: false };
      });
  }
}
