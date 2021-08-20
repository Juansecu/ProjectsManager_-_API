import { Length, IsString, Matches } from 'class-validator';

export class LoginUserByUsernameDto {
  @IsString() @Matches(/^[a-zA-Z0-9]{8,15}$/) username: string;
  @IsString() @Length(8, 16) password: string;
}
