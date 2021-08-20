import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import UserEntity from '../entities/user.entity';

import { AddUserDto } from '../dtos/add-user.dto';
import { LoginUserByEmailDto } from '../dtos/login-user-by-email.dto';
import { LoginUserByUsernameDto } from '../dtos/login-user-by-username.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _USERS_REPOSITORY: Repository<UserEntity>
  ) {}

  async addUser(user: AddUserDto) {
    const newUser = { ...user };

    try {
      const userExists =
        (await this.getUserByEmail(user.email)) ||
        (await this.getUserByUsername(user.username));

      if (userExists)
        return {
          code: 409,
          message: 'User already exists'
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

  async login(userData: LoginUserByEmailDto | LoginUserByUsernameDto) {
    let user: UserEntity;

    try {
      if ((userData as LoginUserByEmailDto).email)
        user = await this.getUserByEmail(
          (userData as LoginUserByEmailDto).email
        );
      else
        user = await this.getUserByUsername(
          (userData as LoginUserByUsernameDto).username
        );

      if (!user)
        return {
          code: 404,
          message: 'Usuario no encontrado'
        };

      const validPassword: boolean = await this.validatePassword(
        userData.password,
        user.userId
      );

      if (!validPassword)
        return {
          code: 401,
          message: 'Contraseña incorrecta'
        };

      return {
        code: 200,
        message: 'Usuario autenticado',
        token: sign(
          {
            userId: user.userId,
            username: user.username
          },
          process.env.JWT_SECRET
        )
      };
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', error.code, error.message);
      return {
        code: 500,
        message: 'Hubo un error al autenticar al usuario'
      };
    }
  }

  async validatePassword(password: string, userId: string): Promise<boolean> {
    let user: UserEntity;

    try {
      user = await this._USERS_REPOSITORY.findOne({
        where: { userId }
      });

      const isValid = await compare(password, user.password);

      if (isValid) return true;

      return false;
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', error.code, error.message);
      return false;
    }
  }
}
