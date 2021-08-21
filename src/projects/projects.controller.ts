import { Controller, Get, Param } from '@nestjs/common';

import { ProjectsService } from './services/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly _PROJECTS_SERVICE: ProjectsService) {}

  @Get()
  async getProjects() {
    return await this._PROJECTS_SERVICE.getProjects();
  }

  @Get(':companyId')
  async getProjectsByCompanyId(@Param('companyId') companyId: string) {
    return await this._PROJECTS_SERVICE.getProjectsByCompanyId(companyId);
  }
}
