import { Controller, Get, HttpCode, HttpException, HttpStatus, Query } from '@nestjs/common';
import User from 'src/database/entities/users.entity';
import errmessages from 'src/utils/errmessages';
import { GetUsersDTO } from './dto/get-users-dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { };

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(@Query() getUsersDTO: GetUsersDTO): Promise<User[]> {
    const { username } = getUsersDTO;
    let result: User[]
        
    try {
      result = await this.userService.find(username);
    } catch (e) {
      throw new HttpException(errmessages.INTERNAL_SERVER_ERROR, 
        HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return result;
  }
}
