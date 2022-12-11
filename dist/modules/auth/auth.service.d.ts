import { UserService } from 'src/modules/user/user.service';
import LoginUserDto from './dto/login-user.dto';
import { ISignInResponse } from './interfaces/signin-response.interface';
import SignUpUserDTO from './dto/user-create.dto';
import { IAccessTokenPayload } from './interfaces/access-token-payload.interface';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    sigunp(signUpUserDTO: SignUpUserDTO): Promise<void>;
    login(loginUserDto: LoginUserDto): Promise<ISignInResponse>;
    verifyAccessToken(token: string): IAccessTokenPayload;
    verifyRefreshToken(token: any): Promise<ISignInResponse>;
}
