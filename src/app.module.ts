import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import ormConfig from './utils/orm-config';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UsersModule, AuthModule],
})
export class AppModule {}
