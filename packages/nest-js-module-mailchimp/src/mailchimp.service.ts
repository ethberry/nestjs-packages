import {HttpService, Inject, Injectable, Logger, LoggerService} from "@nestjs/common";
import {map} from "rxjs/operators";

import {IAddMemberToListResponse, IMailchimpOptions} from "./interfaces";
import {ProviderType} from "./mailchimp.constants";

@Injectable()
export class MailchimpService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(ProviderType.MAILCHIMP_OPTIONS)
    private readonly options: IMailchimpOptions,
  ) {}

  public addToContactList(
    listId: string,
    email: string,
    fields: Record<string, string>,
  ): Promise<IAddMemberToListResponse | null> {
    // https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
    return this.httpService
      .request({
        method: "post",
        url: `https://${this.options.dc}.api.mailchimp.com/3.0/lists/${listId}/members/`,
        auth: {
          username: this.options.userName,
          password: this.options.apiKey,
        },
        data: {
          email_address: email,
          status: "subscribed",
          merge_fields: fields,
        },
      })
      .pipe(map((response: {data: IAddMemberToListResponse}) => response.data))
      .toPromise()
      .catch(e => {
        this.loggerService.error(e.message, e.stack, MailchimpService.name);
        return null;
      });
  }
}
