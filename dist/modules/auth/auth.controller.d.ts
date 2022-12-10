import SignUpUserDTO from 'src/modules/auth/dto/user-create.dto';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/login-user.dto';
import { UserCreatedDTO } from './dto/user-created.dto';
import { ISignInResponse } from './interfaces/signin-response.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signupUser(signUpUserDTO: SignUpUserDTO): Promise<UserCreatedDTO>;
    loginUser(loginUserDto: LoginUserDto): Promise<ISignInResponse>;
}
