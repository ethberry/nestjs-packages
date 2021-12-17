import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class LicenseGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(_context: ExecutionContext): boolean {
    // const request = context.switchToHttp().getRequest();

    // if (request.headers.get('X-License-Key') === environment.API_KEY) {
    //   return true;
    // }

    throw new InternalServerErrorException();
  }
}
