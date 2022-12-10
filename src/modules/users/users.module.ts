import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../../database/entities/users.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
