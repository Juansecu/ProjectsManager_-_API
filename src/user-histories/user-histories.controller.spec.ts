import { Test, TestingModule } from '@nestjs/testing';
import { UserHistoriesController } from './user-histories.controller';

describe('UserHistoriesController', () => {
  let controller: UserHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHistoriesController],
    }).compile();

    controller = module.get<UserHistoriesController>(UserHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
