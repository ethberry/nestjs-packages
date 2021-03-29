import {Inject, Injectable} from "@nestjs/common";
import {SES} from "aws-sdk";

import {ISESOptions, ISesSendFields} from "./interfaces";
import {ProviderType} from "./ses.constants";

@Injectable()
export class SesService {
  constructor(
    @Inject(ProviderType.SES)
    private readonly ses: SES,
    @Inject(ProviderType.SES_OPTIONS)
    private readonly options: ISESOptions,
  ) {}

  async sendMail(mail: ISesSendFields): Promise<any> {
    return this.ses
      .sendEmail({
        Source: this.options.from,
        Destination: {
          ToAddresses: mail.to,
        },
        Message: {
          Body: {
            Html: {
              Data: mail.html,
            },
          },
          Subject: {
            Data: mail.subject,
          },
        },
      })
      .promise();
  }
}
