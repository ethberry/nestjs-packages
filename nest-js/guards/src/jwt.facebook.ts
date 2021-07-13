import {CanActivate, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwtFacebookGuard extends AuthGuard("jwt-facebook") implements CanActivate {}
