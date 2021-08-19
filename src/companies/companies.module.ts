import { Module } from '@nestjs/common';

import { CompaniesController } from './companies.controller';

import { CompaniesService } from './services/companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
