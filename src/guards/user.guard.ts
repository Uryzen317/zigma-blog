import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CookieUser } from 'src/interfaces/CookieUser.type';
import RoleSybmol from 'src/symbols/role.symbol';

@Injectable()
export class UserGuard implements CanActivate {
  private readonly TOKEN_KEY = 'zigma-mainnet-auth';

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // get token
    const request: Request = context.switchToHttp().getRequest();
    const signedCookies = request.signedCookies;
    const authToken = signedCookies[this.TOKEN_KEY];
    if (!authToken) return false;

    // validate user roles /w required role
    const cookieUser = JSON.parse(authToken) as CookieUser;
    const requiredRole = this.reflector.get(RoleSybmol, context.getHandler());
    if (requiredRole && !cookieUser.roles.includes(requiredRole)) return false;

    return true;
  }
}
