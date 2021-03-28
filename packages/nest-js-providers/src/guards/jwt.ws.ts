import {ExecutionContext, Injectable, CanActivate} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AuthGuard} from "@nestjs/passport";
import {WsException} from "@nestjs/websockets";

@Injectable()
export class JwtWsGuard extends AuthGuard("jwt-ws") implements CanActivate {
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
      throw new WsException("unauthorized");
    });
  }
}
