import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { SES, SendEmailCommand } from "@aws-sdk/client-ses";
import { IEmailResult, ISendEmailDto, ISendMailService } from "@ethberry/types-email";

import { ISesOptions } from "./interfaces";
import { SES_OPTIONS_PROVIDER } from "./ses.constants";

@Injectable()
export class SesService implements ISendMailService {
  private client: SES;

  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(SES_OPTIONS_PROVIDER)
    private readonly options: ISesOptions,
  ) {
    const { accessKeyId, secretAccessKey, region } = options;
    this.client = new SES({ credentials: { accessKeyId, secretAccessKey }, region });
  }

  async sendEmail(mail: ISendEmailDto): Promise<IEmailResult> {
    const sendEmailCommand = new SendEmailCommand({
      Source: this.options.from,
      Destination: {
        ToAddresses: mail.to,
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: mail.html,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: mail.subject,
        },
      },
    });

    return this.client
      .send(sendEmailCommand)
      .then(() => {
        return { status: true };
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, SesService.name);
        return { status: false };
      });
  }
}
