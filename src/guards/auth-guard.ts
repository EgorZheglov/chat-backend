import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/decorators/public-endpoint';
import { AuthService } from 'src/modules/auth/auth.service';
import { IAccessTokenPayload } from 'src/modules/auth/interfaces/access-token-payload.interface';
import { INCORRECT_TOKEN, SHOULD_CONTAINS_TOKEN } from 'src/utils/errmessages';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new HttpException(SHOULD_CONTAINS_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    const headerParts = authorizationHeader.split(' ');
    if (headerParts[0] !== 'Bearer') {
      throw new HttpException(INCORRECT_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    const accessToken = headerParts[1];
    let tokenIsValid: IAccessTokenPayload;
    try {
      tokenIsValid = this.authService.verifyAccessToken(accessToken);
    } catch (e) {
      throw new HttpException(INCORRECT_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    if (!tokenIsValid) {
      throw new HttpException(INCORRECT_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
