import { Body, Controller, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiProperty, ApiResponse } from '@nestjs/swagger/dist/decorators';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { Public } from 'src/decorators/public-endpoint';
import SignUpUserDTO from 'src/modules/auth/dto/user-create.dto';
import { USER_CREATED } from '../../utils/messages';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/login-user.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { SignInResponseDTO } from './dto/sign-in-response.dto';
import { UserCreatedDTO } from './dto/user-created.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ description: 'creating new user' })
  @ApiResponse({
    type: UserCreatedDTO,
    status: HttpStatus.CREATED,
  })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signupUser(
    @Body() signUpUserDTO: SignUpUserDTO,
  ): Promise<UserCreatedDTO> {
    await this.authService.sigunp(signUpUserDTO);

    return { message: USER_CREATED };
  }

  @Public()
  @ApiOperation({ description: 'Getting new pair of tokens' })
  @ApiResponse({
    type: SignInResponseDTO,
    status: HttpStatus.OK,
  })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<SignInResponseDTO> {
    const result = await this.authService.login(loginUserDto);

    return result;
  }

  @Public()
  @ApiOperation({ description: 'Refreshing tokens new pair of tokens' })
  @ApiResponse({
    type: SignInResponseDTO,
    status: HttpStatus.CREATED,
  })
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refreshToken(
    @Body() refreshTokenDTO: RefreshTokenDTO,
  ): Promise<SignInResponseDTO> {
    const result = await this.authService.verifyRefreshToken(refreshTokenDTO);

    return result;
  }
}
