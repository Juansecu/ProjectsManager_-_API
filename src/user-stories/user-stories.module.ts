import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserStoryEntity from './entities/user-story.entity';

import { SharedModule } from 'src/shared/shared.module';
import { TicketsModule } from '../tickets/tickets.module';
import { UsersModule } from 'src/users/users.module';

import { UserStoriesController } from './user-stories.controller';

import { UserStoriesService } from './services/user-stories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStoryEntity]),
    forwardRef(() => TicketsModule),
    SharedModule,
    UsersModule
  ],
  controllers: [UserStoriesController],
  providers: [UserStoriesService],
  exports: [UserStoriesService]
})
export class UserStoriesModule {}
