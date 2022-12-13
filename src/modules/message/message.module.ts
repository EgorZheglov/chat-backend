import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Message from '../../database/entities/messages.entity';
import { AuthModule } from '../auth/auth.module';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [TypeOrmModule.forFeature([Message]), AuthModule, GatewayModule],
})
export class MessageModule {}
