import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { setConfig, lists, Status } from "@mailchimp/mailchimp_marketing";

import { IMailchimpOptions } from "./interfaces";
import { MAILCHIMP_OPTIONS_PROVIDER } from "./mailchimp.constants";

@Injectable()
export class MailchimpService {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(MAILCHIMP_OPTIONS_PROVIDER)
    options: IMailchimpOptions,
  ) {
    setConfig({
      apiKey: options.apiKey,
      server: options.dc,
    });
  }

  public addToContactList(listId: string, email: string, fields: Record<string, string>): Promise<void> {
    return lists
      .addListMember(listId, {
        email_address: email,
        status: Status.subscribed,
        merge_fields: fields,
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, MailchimpService.name);
      });
  }
}
