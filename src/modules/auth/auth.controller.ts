import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public-endpoint';
import SignUpUserDTO from 'src/modules/auth/dto/user-create.dto';
import { USER_CREATED } from '../../utils/messages';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/login-user.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { SignInResponseDTO } from './dto/sign-in-response.dto';
import { UserCreatedDTO } from './dto/user-created.dto';
import { ISignInResponse } from './interfaces/signin-response.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signupUser(
    @Body() signUpUserDTO: SignUpUserDTO,
  ): Promise<UserCreatedDTO> {
    await this.authService.sigunp(signUpUserDTO);

    return { message: USER_CREATED };
  }

  @Public()
  @Post('signin')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<SignInResponseDTO> {
    const result = await this.authService.login(loginUserDto);

    return result;
  }

  @Public()
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDTO: RefreshTokenDTO,
  ): Promise<SignInResponseDTO> {
    const result = await this.authService.verifyRefreshToken(refreshTokenDTO);

    return result;
  }
}
