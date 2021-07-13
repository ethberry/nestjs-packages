import {CanActivate, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwksGoogleGuard extends AuthGuard("jwks-google") implements CanActivate {}
