import { Controller, Get, Headers, Param } from '@nestjs/common';

import { TicketsService } from './services/tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly _TICKETS_SERVICE: TicketsService) {}

  @Get()
  getTickets(@Headers('x-authorization') authToken: string) {
    return this._TICKETS_SERVICE.getTickets(authToken);
  }

  @Get('user-tickets/:userId')
  getTicketsByUserId(@Param('userId') userId: string) {
    return this._TICKETS_SERVICE.getTicketsByUserId(userId);
  }
}
