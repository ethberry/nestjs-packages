export interface IGeeTestDto {
  challenge: string;
  validate: string;
  seccode: string;
}

export interface IValidateDto {
  geetest: IGeeTestDto;
}
