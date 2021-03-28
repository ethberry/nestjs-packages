import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwtHttpGuard extends AuthGuard("jwt-http") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // `super` has to be called to set `user` on `request`
    // see https://github.com/nestjs/passport/blob/master/lib/auth.guard.ts
    return super.canActivate(context).catch(e => {
      const isPublicHandler = this.reflector.get<boolean>("isPublic", context.getHandler());
      const isPublicClass = this.reflector.get<boolean>("isPublic", context.getClass());

      if (isPublicHandler || isPublicClass) {
        return true;
      }

      console.error(e);
      throw new UnauthorizedException("unauthorized");
    });
  }
}
