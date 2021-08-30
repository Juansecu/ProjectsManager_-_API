import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ProjectEntity from '../entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly _PROJECTS_REPOSITORY: Repository<ProjectEntity>
  ) {}

  async getProjects() {
    try {
      return await this._PROJECTS_REPOSITORY.find();
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.code, error.message);
      return {
        code: 500,
        message: 'Hubo un error al obtener todos los proyectos'
      };
    }
  }

  async getProjectsByCompanyId(companyId: string) {
    try {
      return await this._PROJECTS_REPOSITORY.find({
        where: { companyId }
      });
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error.code, error.message);
      return {
        code: 500,
        message: 'Hubo un error al obtener los proyectos'
      };
    }
  }
}
