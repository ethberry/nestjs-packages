import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { IGeeTestDto } from "./interfaces";
import { GeeTestService } from "./geetest.service";

interface IGeeTestConstraints {
  required: boolean;
}

@Injectable()
@ValidatorConstraint({ async: true })
export class ValidateGeeTest implements ValidatorConstraintInterface {
  private reason: string;

  constructor(private readonly geeTestService: GeeTestService, private readonly configService: ConfigService) {}

  public async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    this.reason = await this.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private async isValid(value: unknown, args: ValidationArguments): Promise<string> {
    const { required = true }: IGeeTestConstraints = args.constraints[0];

    const nodeEnv = this.configService.get<string>("NODE_ENV", "development");
    if (nodeEnv === "test") {
      return "";
    }

    if (!required) {
      return "";
    }

    return this.geeTestService.validate(value as IGeeTestDto).then(result => {
      if (result.result !== "success") {
        return "gee-test-fail";
      }
      return "";
    });
  }
}

export function GeeCaptcha(constraints: Partial<IGeeTestConstraints> = {}, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: "GeeCaptcha",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateGeeTest,
    });
  };
}
