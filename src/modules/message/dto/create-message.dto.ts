import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMessageDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly consumerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly data: string;
}
