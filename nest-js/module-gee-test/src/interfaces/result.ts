export interface IRegisterResult {
  challenge: string;
  gt: string;
  new_captcha: boolean;
  success: number;
}

export interface IValidateResult {
  result: string;
  version: string;
  msg?: string;
}
