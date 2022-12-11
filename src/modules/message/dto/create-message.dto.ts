import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDTO {
  @ApiProperty()
  readonly consumerId: string;
  
  @ApiProperty()
  readonly data: string;
}
