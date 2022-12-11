import { ApiProperty } from '@nestjs/swagger';
import { USER_CREATED } from '../../../utils/messages';

export class UserCreatedDTO {
  @ApiProperty({ example: USER_CREATED })
  message: string;
}
