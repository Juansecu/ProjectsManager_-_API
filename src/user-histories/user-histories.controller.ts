import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserHistoryDto } from './dtos/create-user-history.dto';

import { UserHistoriesService } from './services/user-histories.service';

@Controller('user-histories')
export class UserHistoriesController {
  constructor(
    private readonly _USERS_HISTORIES_SERVICE: UserHistoriesService
  ) {}

  @Post('create')
  async createUserHistory(@Body() newUserHistory: CreateUserHistoryDto) {
    return await this._USERS_HISTORIES_SERVICE.createUserHistory(
      newUserHistory
    );
  }
}
