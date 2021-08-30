import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserHistoryEntity from './entities/user-history.entity';

import { SharedModule } from 'src/shared/shared.module';
import { TicketsModule } from '../tickets/tickets.module';
import { UsersModule } from 'src/users/users.module';

import { UserHistoriesController } from './user-histories.controller';

import { UserHistoriesService } from './services/user-histories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHistoryEntity]),
    forwardRef(() => TicketsModule),
    SharedModule,
    UsersModule
  ],
  controllers: [UserHistoriesController],
  providers: [UserHistoriesService],
  exports: [UserHistoriesService]
})
export class UserHistoriesModule {}
