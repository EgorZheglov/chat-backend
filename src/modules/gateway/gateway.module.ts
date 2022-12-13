import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { GatewayService } from './gateway.service';

@Module({
  imports: [AuthModule],
  providers: [GatewayService],
  exports: [GatewayService],
})
export class GatewayModule {}
