import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserHistoryEntity from './entities/user-history.entity';

import { TicketsModule } from '../tickets/tickets.module';

import { UserHistoriesController } from './user-histories.controller';

import { UserHistoriesService } from './services/user-histories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHistoryEntity]),
    forwardRef(() => TicketsModule)
  ],
  controllers: [UserHistoriesController],
  providers: [UserHistoriesService],
  exports: [UserHistoriesService]
})
export class UserHistoriesModule {}
