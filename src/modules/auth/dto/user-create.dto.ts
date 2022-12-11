import { IsNotEmpty, IsString } from 'class-validator';

export default class SignUpUserDTO {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
