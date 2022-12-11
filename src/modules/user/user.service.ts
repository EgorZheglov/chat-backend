import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { USER_ALREADY_EXISTS } from '../../utils/errmessages';
import { ICreateUser } from './interfaces/create-user.interface';
import User from '../../database/entities/users.entity';
import { USERS_TAKE_LIMIT } from 'src/global-config';
import { IUser } from './interfaces/user.interface';
import { GetUsersDTO } from './dto/get-users-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(payload: ICreateUser): Promise<void> {
    const user = this.userRepository.create(payload);
    try {
      await this.userRepository.save(user);
    } catch (e) {
      if (
        e.message.startsWith('duplicate key value violates unique constraint')
      ) {
        throw new HttpException(USER_ALREADY_EXISTS, HttpStatus.CONFLICT);
      }
    }
    return;
  }

  async findByUsername(username: string): Promise<User> {
    const [user] = await this.userRepository.find({ where: { username } });

    return user;
  }

  async findById(id: string): Promise<User> {
    const [user] = await this.userRepository.find({ where: { id } });

    return user;
  }

  async find(getUsersDTO: GetUsersDTO): Promise<IUser[]> {
    const { username } = getUsersDTO;

    const users = await this.userRepository.find({
      select: {
        username: true,
        id: true,
      },
      where: username ? { username: Like(`%${username}%`) } : {},
      take: USERS_TAKE_LIMIT,
    });

    return users;
  }
}
