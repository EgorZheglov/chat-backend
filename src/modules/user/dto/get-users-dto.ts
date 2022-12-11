import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GetUsersDTO {
  @IsString()
  @IsOptional()
  username?: string;
}
