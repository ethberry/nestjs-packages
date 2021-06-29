import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {raw} from "body-parser";

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    raw({type: "application/json"})(req, res, next);
  }
}
