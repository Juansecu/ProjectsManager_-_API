import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import UserEntity from '../entities/user.entity';
import { AddUserDto } from '../dtos/add-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _USERS_REPOSITORY: Repository<UserEntity>
  ) {}

  async addUser(user: AddUserDto) {
    const newUser = { ...user };

    try {
      newUser.password = await hash(user.password, 10);

      await this._USERS_REPOSITORY.insert(newUser);

      return {
        code: 201,
        message: 'Usuario creado satisfactoriamente'
      };
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', error.code, error.message);
      return {
        code: 500,
        message: 'Hubo un error al crear el usuario'
      };
    }
  }
}
