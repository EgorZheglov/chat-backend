import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import CreateUserDto from 'src/modules/users/dto/user-create.dto';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/login-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signupUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.sigunp(createUserDto);

    return result;
  }

  @Post('signin')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const result = await this.authService.login(loginUserDto);

    return { ...result, resultCode: 1 };
  }
}
