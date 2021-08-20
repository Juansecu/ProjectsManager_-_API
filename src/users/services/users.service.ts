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
      if (this.getUserByEmail(newUser.email))
        return {
          code: 409,
          message: 'User already exists'
        };
      if (this.getUserByUsername(newUser.username))
        return {
          code: 409,
          message: 'Username already exists'
        };

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

  async getUserByEmail(email: string) {
    let user: UserEntity;

    try {
      user = await this._USERS_REPOSITORY.findOne({
        where: { email }
      });

      return user;
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', error.code, error.message);
      return null;
    }
  }

  async getUserByUsername(username: string) {
    let user: UserEntity;

    try {
      user = await this._USERS_REPOSITORY.findOne({
        where: { username }
      });

      return user;
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', error.code, error.message);
      return null;
    }
  }
}
