import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserHistoryEntity from '../entities/user-history.entity';

import { CreateUserHistoryDto } from '../dtos/create-user-history.dto';

import { JwtService } from 'src/shared/services/jwt/jwt.service';
import { TicketsService } from 'src/tickets/services/tickets.service';

@Injectable()
export class UserHistoriesService {
  private _ticketsService: TicketsService;

  constructor(
    @InjectRepository(UserHistoryEntity)
    private readonly _USER_HISTORIES_REPOSITORY: Repository<UserHistoryEntity>,
    private readonly _JWT_SERVICE: JwtService,
    private readonly _TICKETS_SERVICE: TicketsService
  ) {}

  async createUserHistory(
    userHistory: CreateUserHistoryDto,
    authToken: string
  ) {
    if (!authToken)
      return {
        status: 401,
        message: 'Unauthorized'
      };

    const userId = (this._JWT_SERVICE.verifyToken(authToken) as any)
      .userId as string;

    if (!userId)
      return {
        status: 401,
        message: 'Unauthorized'
      };

    try {
      const userHistoryId = await (
        await this._USER_HISTORIES_REPOSITORY.insert({ ...userHistory, userId })
      ).identifiers[0].userHistoryId;
      await this._TICKETS_SERVICE.createTicket({
        title: userHistory.title,
        userHistoryId
      });
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

  async getUserHistoriesByUserId(userId: string) {
    try {
      return await this._USER_HISTORIES_REPOSITORY.find({
        where: { userId }
      });
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.code, error.message);
      return null;
    }
  }
}
