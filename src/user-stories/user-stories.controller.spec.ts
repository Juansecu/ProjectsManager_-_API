import { Test, TestingModule } from '@nestjs/testing';

import { UserStoriesController } from './user-stories.controller';

describe('UserStoriesController', () => {
  let controller: UserStoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserStoriesController]
    }).compile();

    controller = module.get<UserStoriesController>(UserStoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
