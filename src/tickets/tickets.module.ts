import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TicketEntity from './entities/ticket.entity';
import TicketCommentEntity from './entities/ticket-comment.entity';

import { SharedModule } from 'src/shared/shared.module';
import { UsersModule } from 'src/users/users.module';
import { UserStoriesModule } from 'src/user-stories/user-stories.module';

import { TicketsController } from './tickets.controller';

import { TicketsService } from './services/tickets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity, TicketCommentEntity]),
    SharedModule,
    UsersModule,
    UserStoriesModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService]
})
export class TicketsModule {}
