import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import CreateUserDto from '../users/dto/user-create.dto';
import User from '../users/users.entity';
import { UsersService } from 'src/modules/users/users.service';
//import * as bcrypt from 'bcrypt';
import LoginUserDto from './dto/login-user.dto';
import errmessages from '../../utils/errmessages';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async sigunp(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const result = await this.userService.findByLogin(loginUserDto.login);

    if (!result) {
      throw new UnauthorizedException(errmessages.ERROR_LOGIN);
    }

    if (loginUserDto.password !== result.password) {
      throw new UnauthorizedException(errmessages.ERROR_LOGIN);
    }

    console.log(result);
    if (!result.is_active) {
      //TODO: generate activate token, set it to cache
      throw new HttpException('User is not activated', 403);
    }

    return {
      accessToken: jwt.sign(result.id, 'secret'),
      refreshToken: jwt.sign(result.id, 'secret'),
    };
  }
}
