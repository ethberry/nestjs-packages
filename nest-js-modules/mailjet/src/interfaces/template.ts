export interface ISendTemplateDto {
  template: string;
  to: Array<string>;
  data: Record<string, string>;
}
