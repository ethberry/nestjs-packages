// import {RequestHandler} from "express";
// https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts

declare module "strict-transport-security" {
  interface ITime {
    seconds?: number;
    minutes?: number;
    hours?: number;
    days?: number;
  }

  interface IOptions {
    "max-age"?: number | ITime;
    includeSubDomains?: boolean;
    preload?: boolean;
  }

  export function getSTS(data: IOptions): import("express").RequestHandler;
}
