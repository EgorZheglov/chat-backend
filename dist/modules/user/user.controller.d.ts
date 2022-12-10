import { GetUsersDTO } from './dto/get-users-dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(getUsersDTO: GetUsersDTO): Promise<UserDTO[]>;
}
