import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import LoginUserDto from './dto/login-user.dto';
import { ERROR_LOGIN, INCORRECT_TOKEN } from '../../utils/errmessages';
import * as jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../../global-config';
import { ISignInResponse } from './interfaces/signin-response.interface';
import SignUpUserDTO from './dto/user-create.dto';
import { IAccessTokenPayload } from './interfaces/access-token-payload.interface';
import { IRefreshTokenPayload } from './interfaces/refresh-token-payload.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async sigunp(signUpUserDTO: SignUpUserDTO): Promise<void> {
    await this.userService.createUser(signUpUserDTO);
  }

  async login(loginUserDto: LoginUserDto): Promise<ISignInResponse> {
    const result = await this.userService.findByUsername(loginUserDto.username);
    const isPasswordMatch = await bcrypt.compare(
      loginUserDto.password,
      result.password,
    );

    if (!result || !isPasswordMatch) {
      throw new UnauthorizedException(ERROR_LOGIN);
    }

    return {
      accessToken: jwt.sign(
        { id: result.id, username: result.username },
        JWT_ACCESS_SECRET,
      ),
      refreshToken: jwt.sign(
        { id: result.id, password: result.password },
        JWT_REFRESH_SECRET,
      ),
    };
  }

  verifyAccessToken(token: string): IAccessTokenPayload {
    return jwt.verify(token, JWT_ACCESS_SECRET) as IAccessTokenPayload;
  }

  //soon will be using with roles etc..
  async verifyRefreshToken(token): Promise<ISignInResponse> {
    let tokenPayload: IRefreshTokenPayload;
    try {
      tokenPayload = jwt.verify(
        token,
        JWT_REFRESH_SECRET,
      ) as IRefreshTokenPayload;
    } catch (e) {
      throw new UnauthorizedException(INCORRECT_TOKEN);
    }

    const user = await this.userService.findById(tokenPayload.id);

    return {
      accessToken: jwt.sign(
        { id: user.id, username: user.username },
        JWT_ACCESS_SECRET,
      ),
      refreshToken: jwt.sign(
        { id: user.id, password: user.password },
        JWT_REFRESH_SECRET,
      ),
    };
  }
}
