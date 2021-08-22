import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TicketEntity from '../entities/ticket.entity';

import { CreateTicketDto } from '../dtos/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly _TICKETS_REPOSITORY: Repository<TicketEntity>
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
}
