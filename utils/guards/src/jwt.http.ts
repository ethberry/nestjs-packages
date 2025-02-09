import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtLocalHttpGuard extends AuthGuard("jwt-local-http") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // `super` has to be called to set `user` on `request`
    // see https://github.com/nestjs/passport/blob/master/lib/auth.guard.ts
    return (super.canActivate(context) as Promise<boolean>).catch(e => {
      const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      console.error(e);
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();

      // Headers, cookies and more can be set here
      response.setHeader("Clear-Site-Data", '"storage"');

      if (e instanceof UnauthorizedException) {
        throw e;
      }

      console.error(e);
      throw new UnauthorizedException("unauthorized");
    });
  }
}
