import { Body, Controller, Post } from '@nestjs/common';

import { AddUserDto } from './dtos/add-user.dto';
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

  @Post('login')
  login(@Body() loginUser: LoginUserByEmailDto | LoginUserByUsernameDto) {
    return this._USERS_SERVICE.login(loginUser);
  }
}
