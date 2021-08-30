import { IsUUID, MaxLength } from 'class-validator';

export class CreateTicketDto {
  @MaxLength(45) title: string;
  @IsUUID() userHistoryId: string;
}
