import { Body, Controller, Headers, Post } from '@nestjs/common';

import { CreateUserStoryDto } from './dtos/create-user-story.dto';

import { UserStoriesService } from './services/user-stories.service';

@Controller('user-stories')
export class UserStoriesController {
  constructor(private readonly _USERS_STORIES_SERVICE: UserStoriesService) {}

  @Post('create')
  async createUserStory(
    @Headers('x-authorization') authToken: string,
    @Body() newUserStory: CreateUserStoryDto
  ) {
    return await this._USERS_STORIES_SERVICE.createUserStory(
      newUserStory,
      authToken
    );
  }
}
