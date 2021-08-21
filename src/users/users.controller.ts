import { Body, Controller, Post, Put } from '@nestjs/common';

import { AddUserDto } from './dtos/add-user.dto';
import { JoinCompanyDto } from './dtos/join-company.dto';
import { LoginUserByEmailDto } from './dtos/login-user-by-email.dto';
import { LoginUserByUsernameDto } from './dtos/login-user-by-username.dto';

import { UsersService } from './services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _USERS_SERVICE: UsersService) {}

  @Post('register')
  addUser(@Body() newUser: AddUserDto) {
    return this._USERS_SERVICE.addUser(newUser);
  }

  @Put('join-company')
  joinCompany(@Body() joinCompany: JoinCompanyDto) {
    return this._USERS_SERVICE.joinCompany(
      joinCompany.userId,
      joinCompany.companyId
    );
  }

  @Post('login')
  login(@Body() loginUser: LoginUserByEmailDto | LoginUserByUsernameDto) {
    return this._USERS_SERVICE.login(loginUser);
  }
}
