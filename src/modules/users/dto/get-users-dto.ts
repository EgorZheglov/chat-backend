import { IsString, IsNotEmpty } from 'class-validator';

export class GetUsersDTO {
  @IsString()
  @IsNotEmpty()
  username: string;
}
