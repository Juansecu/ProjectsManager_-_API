import { IsUUID, MaxLength } from 'class-validator';

export class CreateUserHistoryDto {
  @MaxLength(45) title: string;
  @MaxLength(255) description: string;
  @IsUUID() projectId: string;
}
