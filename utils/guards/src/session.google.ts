import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class SessionGoogleGuard extends AuthGuard("session-google") {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }

  public handleRequest<T>(e: Error, userEntity: T): T {
    if (e) {
      console.error(e);
      throw new UnauthorizedException("unauthorized");
    }

    return userEntity;
  }
}
