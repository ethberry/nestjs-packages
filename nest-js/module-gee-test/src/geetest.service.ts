import {HttpService, Inject, Injectable, Logger, LoggerService} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {Cron, CronExpression} from "@nestjs/schedule";
import {InjectRedis} from "@liaoliaots/nestjs-redis";
import {Redis} from "ioredis";
import crypto from "crypto";
import {v4} from "uuid";
import {map} from "rxjs/operators";
import {stringify} from "qs";

import {IGeeTestDto, IRegisterDto, IRegisterResult, IValidateResult} from "./interfaces";
import {GEE_TEST_STORAGE} from "./geetest.constants";

// https://github.com/GeeTeam/gt3-server-node-express-bypass
// https://www.geetest.com/demo/slide-en.html
// https://docs.geetest.com/captcha/apirefer/api/server

@Injectable()
export class GeeTestService {
  static VERSION = "3.1.1";
  static GEETEST_BYPASS_STATUS_KEY = "gt_server_bypass_status";

  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRedis(GEE_TEST_STORAGE)
    private readonly redisClient: Redis,
  ) {}

  public async register(ip: string): Promise<IRegisterResult> {
    const bypasscache = await this.redisClient.get(GeeTestService.GEETEST_BYPASS_STATUS_KEY);
    if (bypasscache === "success") {
      return this.remoteRegister({
        digestmod: "md5",
        user_id: "test",
        client_type: "web",
        ip_address: ip,
      });
    } else {
      return this.localRegister();
    }
  }

  public async validate(dto: IGeeTestDto): Promise<IValidateResult> {
    const bypasscache = await this.redisClient.get(GeeTestService.GEETEST_BYPASS_STATUS_KEY);

    let error;
    if (bypasscache === "success") {
      error = await this.successValidate(dto.challenge, dto.validate, dto.seccode);
    } else {
      error = await this.failValidate(dto.challenge, dto.validate, dto.seccode);
    }

    if (!error) {
      return {
        result: "success",
        version: GeeTestService.VERSION,
      };
    } else {
      return {
        result: "fail",
        version: GeeTestService.VERSION,
        msg: error,
      };
    }
  }

  private async remoteRegister(params: IRegisterDto): Promise<IRegisterResult> {
    const challenge = await this.requestRegister(params);
    return this.buildRegisterResult(challenge, params.digestmod);
  }

  private async localRegister(): Promise<IRegisterResult> {
    await Promise.resolve();
    return this.buildRegisterResult("", "");
  }

  private buildRegisterResult(challenge: string, digestmod: string): IRegisterResult {
    const geetestId = this.configService.get<string>("GEE_TEST_ID", "");

    // challenge Empty or 0 means failure
    if (!challenge || challenge === "0") {
      return {
        success: 0,
        gt: geetestId,
        challenge: v4(),
        new_captcha: true,
      };
    } else {
      return {
        success: 1,
        gt: geetestId,
        challenge: this.getChallenge(challenge, digestmod),
        new_captcha: true,
      };
    }
  }

  private getChallenge(challenge: string, digestmod: string): string {
    const geetestKey = this.configService.get<string>("GEE_TEST_KEY", "");

    switch (digestmod) {
      case "sha256":
        return crypto
          .createHash("sha256")
          .update(challenge + geetestKey)
          .digest("hex");
      case "hmac-sha256":
        return crypto
          .createHmac("sha256", geetestKey)
          .update(challenge + geetestKey)
          .digest("hex");
      case "md5":
      default:
        return crypto
          .createHash("md5")
          .update(challenge + geetestKey)
          .digest("hex");
    }
  }

  async requestRegister(params: IRegisterDto): Promise<any> {
    const geetestId = this.configService.get<string>("GEE_TEST_ID", "");

    return (
      this.httpService
        .request({
          url: "http://api.geetest.com/register.php",
          method: "GET",
          params: {
            ...params,
            gt: geetestId,
            json_format: "1",
            sdk: GeeTestService.VERSION,
          },
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .pipe(map(response => response.data))
        .toPromise()
        .then((data: {challenge: string}) => {
          return data.challenge;
        })
        .catch(e => {
          this.loggerService.error(e.message, e.stack, GeeTestService.name);
          return "";
        })
    );
  }

  public async successValidate(challenge: string, validate: string, seccode: string): Promise<string> {
    if (!this.checkParam(challenge, validate, seccode)) {
      return "Normal mode, local verification, the parameters challenge, validate, seccode cannot be empty";
    } else {
      const response = await this.requestValidate(challenge, validate, seccode);
      if (!response) {
        return "Failed to verify";
      } else if (response === "false") {
        return "Failed to verify the second time";
      } else {
        return "";
      }
    }
  }

  public async failValidate(challenge: string, validate: string, seccode: string): Promise<string> {
    await Promise.resolve();
    if (!this.checkParam(challenge, validate, seccode)) {
      return "Downtime mode, local verification, the parameters challenge, validate, seccode cannot be empty";
    } else {
      return "";
    }
  }

  // lol, param validate is not in use
  // https://github.com/GeeTeam/gt3-server-node-express-bypass/blob/master/sdk/geetest_lib.js#L154
  public requestValidate(challenge: string, _validate: string, seccode: string): Promise<string> {
    const geetestId = this.configService.get<string>("GEE_TEST_ID", "");

    return (
      this.httpService
        .request({
          url: "http://api.geetest.com/validate.php",
          method: "POST",
          data: stringify({
            seccode: seccode,
            json_format: "1",
            challenge: challenge,
            sdk: GeeTestService.VERSION,
            captchaid: geetestId,
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .pipe(map(response => response.data))
        .toPromise()
        .then((data: {seccode: string}) => {
          return data.seccode;
        })
        .catch(e => {
          this.loggerService.error(e.message, e.stack, GeeTestService.name);
          return "";
        })
    );
  }

  protected checkParam(challenge: string, validate: string, seccode: string): boolean {
    return !(
      challenge === void 0 ||
      challenge.trim() === "" ||
      validate === void 0 ||
      validate.trim() === "" ||
      seccode === void 0 ||
      seccode.trim() === ""
    );
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async getBypassStatus(): Promise<void> {
    const geetestId = this.configService.get<string>("GEE_TEST_ID", "");
    return (
      this.httpService
        .request({
          url: "https://bypass.geetest.com/v1/bypass_status.php",
          method: "GET",
          params: {
            gt: geetestId,
          },
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .pipe(map(response => response.data))
        .toPromise()
        .then(async (data: {status: string}) => {
          if (data.status === "success") {
            await this.redisClient.set(GeeTestService.GEETEST_BYPASS_STATUS_KEY, "success");
          } else {
            await this.redisClient.set(GeeTestService.GEETEST_BYPASS_STATUS_KEY, "fail");
          }
        })
        .catch(async e => {
          this.loggerService.error(e.message, e.stack, GeeTestService.name);
          await this.redisClient.set(GeeTestService.GEETEST_BYPASS_STATUS_KEY, "fail");
        })
    );
  }
}
