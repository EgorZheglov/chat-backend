import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import SignUpUserDTO from 'src/modules/auth/dto/user-create.dto';
import messages from '../../utils/messages';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/login-user.dto';
import { ISignInResponse } from './interfaces/signin-response.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signupUser(@Body() signUpUserDTO: SignUpUserDTO): Promise<string> {
    await this.authService.sigunp(signUpUserDTO);

    return messages.USER_CREATED;
  }

  @Post('signin')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<ISignInResponse> {
    const result = await this.authService.login(loginUserDto);

    return result;
  }
}
