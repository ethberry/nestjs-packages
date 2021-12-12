import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

@Injectable()
export class SessionWsGuard extends AuthGuard("session-ws") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    const socket = context.switchToWs().getClient<Socket>();
    // @ts-ignore
    const isAuthenticated: boolean = socket.client.request.isAuthenticated();

    if (!isAuthenticated) {
      throw new WsException("unauthorized");
    }

    return isAuthenticated;
  }
}
