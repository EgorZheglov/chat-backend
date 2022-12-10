import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
//import * as bcrypt from 'bcrypt';
import LoginUserDto from './dto/login-user.dto';
import { ERROR_LOGIN } from '../../utils/errmessages';
import * as jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../../global-config';
import { ISignInResponse } from './interfaces/signin-response.interface';
import SignUpUserDTO from './dto/user-create.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async sigunp(signUpUserDTO: SignUpUserDTO): Promise<void> {
    await this.userService.createUser(signUpUserDTO);
  }

  async login(loginUserDto: LoginUserDto): Promise<ISignInResponse> {
    const result = await this.userService.findByUsername(loginUserDto.username);

    if (!result) {
      throw new UnauthorizedException(ERROR_LOGIN);
    }

    if (loginUserDto.password !== result.password) {
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
}
