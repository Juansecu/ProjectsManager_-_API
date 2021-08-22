import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TicketEntity from '../entities/ticket.entity';
import UserHistoryEntity from 'src/user-histories/entities/user-history.entity';

import { CreateTicketDto } from '../dtos/create-ticket.dto';

import { UserHistoriesService } from 'src/user-histories/services/user-histories.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly _TICKETS_REPOSITORY: Repository<TicketEntity>,
    private readonly _USER_HISTORIES_SERVICE: UserHistoriesService
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

  async getTicketsByUserId(userId: string) {
    try {
      const userTickets: TicketEntity[] = [];

      const userHistories: UserHistoryEntity[] =
        await this._USER_HISTORIES_SERVICE.getUserHistoriesByUserId(userId);

      userHistories.forEach(async ({ userHistoryId }) => {
        const tickets = await this._TICKETS_REPOSITORY.find({
          where: { userHistoryId }
        });

        for (const ticket of tickets) userTickets.push(ticket);
      });

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
