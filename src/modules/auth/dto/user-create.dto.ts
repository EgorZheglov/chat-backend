import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString } from 'class-validator';

export default class SignUpUserDTO {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
