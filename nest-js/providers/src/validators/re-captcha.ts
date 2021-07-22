import {HttpService, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import {map} from "rxjs/operators";

interface ICaptchaResponse {
  success: boolean;
  "error-codes": Array<string>;
}

interface ICaptchaConstraints {
  required: boolean;
}

@Injectable()
@ValidatorConstraint({async: true})
export class ValidateCaptcha implements ValidatorConstraintInterface {
  private reason: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  public async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    this.reason = await this.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private async isValid(value: unknown, args: ValidationArguments): Promise<string> {
    const {required = true}: ICaptchaConstraints = args.constraints[0];

    if (process.env.NODE_ENV === "test") {
      return "";
    }

    if (!required) {
      return "";
    }

    return this.httpService
      .request({
        url: "https://www.google.com/recaptcha/api/siteverify",
        method: "POST",
        params: {
          secret: this.configService.get<string>("GOOGLE_RECAPTCHA_PRIVATE"),
          response: value,
        },
      })
      .pipe(map((response: {data: ICaptchaResponse}) => response.data))
      .toPromise()
      .then(data => {
        if (!data.success) {
          return `recaptcha-${data["error-codes"][0]}`.replace(/-./g, (x: string) => x.toUpperCase()[1]);
        }
        return "";
      });
  }
}

export function Captcha(constraints: Partial<ICaptchaConstraints> = {}, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: "Captcha",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateCaptcha,
    });
  };
}
