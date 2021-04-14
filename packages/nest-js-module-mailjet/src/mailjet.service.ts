import {Inject, Injectable, Logger, LoggerService} from "@nestjs/common";
import {Email} from "node-mailjet";

import {ProviderType} from "./mailjet.constants";
import {IMailjetOptions, IMailjetSendFields} from "./interfaces";

@Injectable()
export class MailjetService {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(ProviderType.MAILJET)
    private readonly mailjet: Email.Client,
    @Inject(ProviderType.MAILJET_OPTIONS)
    private readonly options: IMailjetOptions,
  ) {}

  public getClient(): Email.Client {
    return this.mailjet;
  }

  public sendEmail(mail: IMailjetSendFields): Promise<{status: boolean}> {
    return this.mailjet
      .post("send", {version: "v3.1"})
      .request({
        Messages: [
          {
            From: {
              Email: this.options.from,
              Name: this.options.name,
            },
            To: mail.to.map(to => ({
              Email: to,
            })),
            Subject: mail.subject,
            HTMLPart: mail.html,
          },
        ],
      })
      .then(() => {
        return {status: true};
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, MailjetService.name);
        return {status: false};
      });
  }
}
