import { ApiProperty } from '@nestjs/swagger';

export class MessageDTO {
  @ApiProperty()
  readonly consumerName: string;
  @ApiProperty()
  readonly data: string;
  @ApiProperty()
  readonly timestamp: Date;
  @ApiProperty()
  readonly producerName: string;
}
