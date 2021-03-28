import {CanActivate, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwksAppleGuard extends AuthGuard("jwks-apple") implements CanActivate {}
