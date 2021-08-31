import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserEntity from 'src/users/entities/user.entity';
import UserStoryEntity from '../entities/user-story.entity';

import { CreateUserStoryDto } from '../dtos/create-user-story.dto';

import { JwtService } from 'src/shared/services/jwt/jwt.service';
import { TicketsService } from 'src/tickets/services/tickets.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class UserStoriesService {
  constructor(
    @InjectRepository(UserStoryEntity)
    private readonly _USER_STORIES_REPOSITORY: Repository<UserStoryEntity>,
    private readonly _JWT_SERVICE: JwtService,
    private readonly _TICKETS_SERVICE: TicketsService,
    private readonly _USERS_SERVICE: UsersService
  ) {}

  async createUserStory(userStory: CreateUserStoryDto, authToken: string) {
    if (!authToken)
      return {
        code: 401,
        message: 'Unauthorized'
      };

    const userId = (this._JWT_SERVICE.verifyToken(authToken) as any)
      .userId as string;

    if (!userId)
      return {
        code: 401,
        message: 'Unauthorized'
      };

    try {
      const user: UserEntity = await this._USERS_SERVICE.getUserById(userId);

      if (!user)
        return {
          code: 404,
          message: 'User not found'
        };

      const userStoryId = await (
        await this._USER_STORIES_REPOSITORY.insert({ ...userStory, userId })
      ).identifiers[0].userStoryId;

      await this._TICKETS_SERVICE.createTicket({
        title: userStory.title,
        userStoryId
      });

      return {
        code: 201,
        message: 'Historia de usuario ha sido creada satisfactoriamente'
      };
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.code, error.message);
      return {
        code: 500,
        message: 'Ha habido un error creando la historia de usuario'
      };
    }
  }

  async getUserStoriesByUserId(userId: string) {
    try {
      return await this._USER_STORIES_REPOSITORY.find({
        where: { userId }
      });
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.code, error.message);
      return null;
    }
  }
}
