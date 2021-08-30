import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TicketEntity from '../entities/ticket.entity';
import UserHistoryEntity from 'src/user-histories/entities/user-history.entity';

import { CreateTicketDto } from '../dtos/create-ticket.dto';

import { JwtService } from 'src/shared/services/jwt/jwt.service';
import { UsersService } from 'src/users/services/users.service';
import { UserHistoriesService } from 'src/user-histories/services/user-histories.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly _TICKETS_REPOSITORY: Repository<TicketEntity>,
    @Inject(forwardRef(() => UserHistoriesService))
    private readonly _USER_HISTORIES_SERVICE: UserHistoriesService,
    private readonly _JWT_SERVICE: JwtService,
    private readonly _USERS_SERVICE: UsersService
  ) {}

  async createTicket(ticket: CreateTicketDto) {
    try {
      await this._TICKETS_REPOSITORY.insert({ ...ticket, status: 'Activo' });
      return {
        code: 201,
        message: 'Ticket creado satisfactoriamente'
      };
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.code, error.message);
      return {
        code: 500,
        message: 'Error creando el ticket'
      };
    }
  }

  async getTickets(authToken: string) {
    if (!authToken)
      return {
        code: 401,
        message: 'No se ha proporcionado el token de autenticación'
      };

    const userId: string = (this._JWT_SERVICE.verifyToken(authToken) as any)
      .userId;

    if (!userId)
      return {
        code: 401,
        message: 'Unauthorized'
      };

    try {
      const user = await this._USERS_SERVICE.getUserById(userId);

      if (!user)
        return {
          code: 404,
          message: 'Usuario no encontrado'
        };

      const tickets: TicketEntity[] = await this._TICKETS_REPOSITORY.find({
        where: { userId }
      });

      return tickets;
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.code, error.message);
      return {
        code: 500,
        message: 'Error obteniendo los tickets'
      };
    }
  }

  async getTicketsByUserId(userId: string) {
    try {
      const userTickets: TicketEntity[] = [];

      const userHistories: UserHistoryEntity[] =
        await this._USER_HISTORIES_SERVICE.getUserHistoriesByUserId(userId);

      await Promise.all(
        userHistories.map(async ({ userHistoryId }) => {
          const tickets = await this._TICKETS_REPOSITORY.find({
            where: { userHistoryId }
          });
          tickets.map(ticket => userTickets.push({ ...ticket }));
        })
      );

      return userTickets;
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.code, error.message);
      return {
        code: 500,
        message: 'Error obteniendo los tickets'
      };
    }
  }
}
