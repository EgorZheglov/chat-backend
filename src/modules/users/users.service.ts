import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/user-create.dto';
import User from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    try {
      await this.userRepository.save(user);
    } catch (e) {
      if (
        e.message.startsWith('duplicate key value violates unique constraint')
      ) {
        throw new HttpException('Login already exists', 409);
      }
    }
    return user;
  }

  async findByLogin(login: string): Promise<User> {
    const [user] = await this.userRepository.find({ where: { login } });

    return user;
  }
}
