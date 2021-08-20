import { Body, Controller, Post } from '@nestjs/common';

import { AddUserDto } from './dtos/add-user.dto';

import { UsersService } from './services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _USERS_SERVICE: UsersService) {}

  @Post('register')
  addUser(@Body() newUser: AddUserDto) {
    return this._USERS_SERVICE.addUser(newUser);
  }
}
