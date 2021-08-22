import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TicketEntity from './entities/ticket.entity';
import TicketCommentEntity from './entities/ticket-comment.entity';

import { UserHistoriesModule } from 'src/user-histories/user-histories.module';

import { TicketsController } from './tickets.controller';

import { TicketsService } from './services/tickets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity, TicketCommentEntity]),
    UserHistoriesModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
