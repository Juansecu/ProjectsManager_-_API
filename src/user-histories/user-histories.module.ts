import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserHistoryEntity from './entities/user-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserHistoryEntity])]
})
export class UserHistoriesModule {}
