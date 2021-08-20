import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserEntity from './entities/user.entity';
import UserHistoryEntity from './entities/user-history.entity';

import { UsersController } from './users.controller';

import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserHistoryEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
