import { IsUUID, MaxLength } from 'class-validator';

export class CreateUserStoryDto {
  @MaxLength(45) title: string;
  @MaxLength(255) description: string;
  @IsUUID() projectId: string;
}
