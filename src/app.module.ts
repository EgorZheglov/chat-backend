import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';
import ormConfig from './database/orm-config';
import { APP_GUARD } from '@nestjs/core';
import AuthGuard from './guards/auth-guard';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    AuthModule,
    MessageModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
