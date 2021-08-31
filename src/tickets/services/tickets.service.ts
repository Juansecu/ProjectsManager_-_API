import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TicketEntity from '../entities/ticket.entity';
import UserStoryEntity from 'src/user-stories/entities/user-story.entity';

import { CreateTicketDto } from '../dtos/create-ticket.dto';

import { JwtService } from 'src/shared/services/jwt/jwt.service';
import { UsersService } from 'src/users/services/users.service';
import { UserStoriesService } from 'src/user-stories/services/user-stories.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly _TICKETS_REPOSITORY: Repository<TicketEntity>,
    @Inject(forwardRef(() => UserStoriesService))
    private readonly _USER_STORIES_SERVICE: UserStoriesService,
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

  async closeTicket(ticketId: string, authToken: string) {
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
      const ticket = await this._TICKETS_REPOSITORY.findOne({
        where: { ticketId }
      });

      if (!ticket)
        return {
          code: 404,
          message: 'Ticket no encontrado'
        };

      await this._TICKETS_REPOSITORY.update(ticketId, {
        status: 'Finalizado'
      });

      return {
        code: 200,
        message: 'Ticket cerrado satisfactoriamente'
      };
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.code, error.message);
      return {
        code: 500,
        message: 'Error cerrando el ticket'
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

      return this.getTicketsByUserId(userId);
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

      const userStories: UserStoryEntity[] =
        await this._USER_STORIES_SERVICE.getUserStoriesByUserId(userId);

      await Promise.all(
        userStories.map(async ({ userStoryId }) => {
          const tickets = await this._TICKETS_REPOSITORY.find({
            where: { userStoryId }
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
