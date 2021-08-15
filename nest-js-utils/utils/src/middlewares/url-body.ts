import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { urlencoded } from "body-parser";

@Injectable()
export class UrlBodyMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    urlencoded({ extended: true })(req, res, next);
  }
}
