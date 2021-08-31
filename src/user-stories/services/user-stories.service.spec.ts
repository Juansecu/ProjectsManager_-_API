import { Test, TestingModule } from '@nestjs/testing';

import { UserStoriesService } from './user-stories.service';

describe('UserStoriesService', () => {
  let service: UserStoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStoriesService]
    }).compile();

    service = module.get<UserStoriesService>(UserStoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
