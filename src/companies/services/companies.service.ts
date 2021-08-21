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

  async getCompanyById(companyId: string): Promise<CompanyEntity> {
    try {
      const companyExists = await this._COMPANIES_REPOSITORY.findOne({
        where: { companyId }
      });

      if (companyExists) return companyExists;

      return null;
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', error.code, error.message);
      return null;
    }
  }
}
