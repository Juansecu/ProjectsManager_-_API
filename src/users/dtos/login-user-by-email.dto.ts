import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class LoginUserByEmailDto {
  @IsEmail() @IsString() @MaxLength(45) email: string;
  @IsString() @Length(8, 16) password: string;
}
