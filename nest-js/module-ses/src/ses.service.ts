import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { SES } from "aws-sdk";

import { ISesOptions, ISesSendDto } from "./interfaces";
import { SES_OPTIONS_PROVIDER } from "./ses.constants";

@Injectable()
export class SesService {
  private ses: SES;

  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(SES_OPTIONS_PROVIDER)
    private readonly options: ISesOptions,
  ) {
    const { accessKeyId, secretAccessKey, region } = options;
    this.ses = new SES({ accessKeyId, secretAccessKey, region });
  }

  async sendEmail(mail: ISesSendDto): Promise<{ status: boolean }> {
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
      .promise()
      .then(() => {
        return { status: true };
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, SesService.name);
        return { status: false };
      });
  }
}
