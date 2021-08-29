export interface ISendTemplateDto {
  template: number;
  to: Array<string>;
  data: Record<string, string>;
}
