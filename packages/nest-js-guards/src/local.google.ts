import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class LocalGoogleGuard extends AuthGuard("local-google") {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }

  public handleRequest<UserEntity>(e: Error, userEntity: UserEntity): UserEntity {
    if (e) {
      console.error(e);
      throw new UnauthorizedException("unauthorized");
    }

    return userEntity;
  }
}
