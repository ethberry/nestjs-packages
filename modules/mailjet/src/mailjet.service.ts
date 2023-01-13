import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import Client, { LibraryResponse } from "node-mailjet";

import { IEmailResult, ISendEmailDto, ISendMailService } from "@gemunion/types-email";

import { MAILJET_OPTIONS_PROVIDER } from "./mailjet.constants";
import { IContact, IMailjetOptions, ISendTemplateDto, TResponse } from "./interfaces";

@Injectable()
export class MailjetService implements ISendMailService {
  private client: Client;

  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(MAILJET_OPTIONS_PROVIDER)
    private readonly options: IMailjetOptions,
  ) {
    this.client = Client.apiConnect(options.publicKey, options.privateKey);
  }

  public sendEmail(dto: ISendEmailDto): Promise<IEmailResult> {
    return this.client
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: this.options.from,
              Name: this.options.name,
            },
            To: dto.to.map(to => ({
              Email: to,
            })),
            Subject: dto.subject,
            HTMLPart: dto.html,
          },
        ],
      })
      .then(() => {
        return { status: true };
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, MailjetService.name);
        return { status: false };
      });
  }

  public sendTemplate(dto: ISendTemplateDto): Promise<IEmailResult> {
    return this.client
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: this.options.from,
              Name: this.options.name,
            },
            To: dto.to.map(to => ({
              Email: to,
            })),
            TemplateID: dto.template,
            TemplateLanguage: true,
            Variables: dto.data,
          },
        ],
      })
      .then(() => {
        return { status: true };
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, MailjetService.name);
        return { status: false };
      });
  }

  public addToContactList(
    listId: number,
    email: string,
    props: Record<string, any>,
  ): Promise<LibraryResponse<TResponse<IContact>>> {
    return this.client
      .post("contactslist", { version: "v3" })
      .id(listId)
      .action("managecontact")
      .request<TResponse<IContact>>({
        Action: "addnoforce",
        Email: email,
        Name: props.name,
        Properties: props,
      })
      .then(result => {
        if (result.body.Total) {
          this.loggerService.log(`Successfully added ${email} to contact list`, MailjetService.name);
        }
        return result;
      });
  }

  public async deleteFromContactList(listId: number, email: string): Promise<void> {
    await this.client
      .post("contactslist", { version: "v3" })
      .id(listId)
      .action("managecontact")
      .request<TResponse<IContact>>({
        Action: "remove",
        Email: email,
      })
      .then(result => {
        if (result.body.Total) {
          this.loggerService.log(`Successfully deleted ${email} from contact list list`, MailjetService.name);
        }
      });
  }
}
