import { Controller, Get } from '@nestjs/common';

import CompanyEntity from './entities/company.entity';

import { CompaniesService } from './services/companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly _COMPANIES_SERVICE: CompaniesService) {}

  @Get()
  getCompanies(): Promise<CompanyEntity[]> {
    return this._COMPANIES_SERVICE.getCompanies();
  }
}
