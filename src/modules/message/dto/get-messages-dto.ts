import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetMessagesDTO {
  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly interlocutorId: string;

  @IsDateString()
  @IsNotEmpty()
  readonly dateFrom?: Date;

  @IsDateString()
  @IsNotEmpty()
  readonly dateTo?: Date;
}
