import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProjectEntity from './entities/project.entity';

import { ProjectsController } from './projects.controller';

import { ProjectsService } from './services/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
