declare module "css-mediaquery" {
  export function match(mediaQuery: string, view: {type?: string; width?: number; height?: number}): boolean;
}
