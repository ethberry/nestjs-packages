import { CanActivate, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGoogleGuard extends AuthGuard("jwt-google") implements CanActivate {}
