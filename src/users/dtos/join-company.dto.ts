import { IsUUID } from 'class-validator';

export class JoinCompanyDto {
  @IsUUID() companyId: string;
  @IsUUID() userId: string;
}
