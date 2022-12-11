import { ApiProperty } from '@nestjs/swagger';
import { MESSAGE_CREATED } from '../../../utils/messages';

export class MessageCreatedDTO {
  @ApiProperty({ example: MESSAGE_CREATED })
  message: string;
}
