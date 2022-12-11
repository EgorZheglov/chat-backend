import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetMessagesDTO {
  @IsString()
  @IsNotEmpty()
  readonly interlocutorId: string;

  @IsDateString()
  @IsOptional()
  readonly dateFrom?: Date;
}
