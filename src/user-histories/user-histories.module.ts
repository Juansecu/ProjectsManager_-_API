import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHistoriesController } from './user-histories.controller';
import { UserHistoriesService } from './services/user-histories.service';

import UserHistoryEntity from './entities/user-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserHistoryEntity])],
  controllers: [UserHistoriesController],
  providers: [UserHistoriesService]
})
export class UserHistoriesModule {}
