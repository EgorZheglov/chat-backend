import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { INTERNAL_SERVER_ERROR } from 'src/utils/errmessages';
import { GetUsersDTO } from './dto/get-users-dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(@Query() getUsersDTO: GetUsersDTO): Promise<UserDTO[]> {
    let result: UserDTO[];

    try {
      result = await this.userService.find(getUsersDTO);
    } catch (e) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }
}
