import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserHistoryEntity from '../entities/user-history.entity';

import { CreateUserHistoryDto } from '../dtos/create-user-history.dto';

@Injectable()
export class UserHistoriesService {
  constructor(
    @InjectRepository(UserHistoryEntity)
    private readonly _USER_HISTORIES_REPOSITORY: Repository<UserHistoryEntity>
  ) {}

  async createUserHistory(userHistory: CreateUserHistoryDto) {
    try {
      await this._USER_HISTORIES_REPOSITORY.insert(userHistory);
      return {
        code: 201,
        message: 'Historia de usuario ha sido creada satisfactoriamente'
      };
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.code, error.message);
      return {
        code: 500,
        message: 'Ha habido un error creando la historia de usuario'
      };
    }
  }
}
