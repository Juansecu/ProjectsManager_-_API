import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserEntity from '../entities/user.entity';
import { AddUserDto } from '../dtos/add-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _USERS_REPOSITORY: Repository<UserEntity>
  ) {}

  addUser(user: AddUserDto) {
    return this._USERS_REPOSITORY
      .insert(user)
      .then(user => {
        return {
          code: 201,
          message: 'User created',
          data: user
        };
      })
      .catch((error: Error) => {
        console.error(typeof Error, error.message);
        return {
          code: 500,
          message: 'Hubo un error al crear el usuario'
        };
      });
  }
}
