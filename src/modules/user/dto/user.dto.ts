import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly id: string;
}
