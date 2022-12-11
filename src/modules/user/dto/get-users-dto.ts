import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GetUsersDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  username?: string;
}
