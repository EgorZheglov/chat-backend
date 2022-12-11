import { Module } from '@nestjs/common';
import { Gateway } from './gateway.service';

@Module({
  providers: [Gateway],
  exports: [Gateway],
})
export class GatewayModule {}
