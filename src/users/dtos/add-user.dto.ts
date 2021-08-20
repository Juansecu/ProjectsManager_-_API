import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';

export class AddUserDto {
  @IsString() @Matches(/^[a-zA-Z0-9]{8,15}$/) username: string;
  @IsEmail() @IsString() @MaxLength(45) email: string;
  @IsString() @Matches(/^[a-zA-Z]{2,20}$/) firstName: string;
  @IsString() @Matches(/^[a-zA-Z]{3,20}$/) lastName: string;
  @IsString() @Length(8, 16) password: string;
}
