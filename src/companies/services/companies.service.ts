import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CompanyEntity from '../entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly _COMPANIES_REPOSITORY: Repository<CompanyEntity>
  ) {}

  getCompanies(): Promise<CompanyEntity[]> {
    return this._COMPANIES_REPOSITORY.find();
  }
}
