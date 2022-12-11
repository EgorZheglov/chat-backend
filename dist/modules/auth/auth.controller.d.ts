import SignUpUserDTO from 'src/modules/auth/dto/user-create.dto';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/login-user.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { SignInResponseDTO } from './dto/sign-in-response.dto';
import { UserCreatedDTO } from './dto/user-created.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signupUser(signUpUserDTO: SignUpUserDTO): Promise<UserCreatedDTO>;
    loginUser(loginUserDto: LoginUserDto): Promise<SignInResponseDTO>;
    refreshToken(refreshTokenDTO: RefreshTokenDTO): Promise<SignInResponseDTO>;
}
