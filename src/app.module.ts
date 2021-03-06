import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CompaniesModule } from './companies/companies.module';
import { ProjectsModule } from './projects/projects.module';
import { SharedModule } from './shared/shared.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { UserStoriesModule } from './user-stories/user-stories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/**/*.entity.{ts,js}'],
      host: process.env.DATABASE_HOST,
      migrationsRun: true,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT, 10),
      type: 'mysql',
      username: process.env.DATABASE_USER
    }),
    CompaniesModule,
    ProjectsModule,
    SharedModule,
    TicketsModule,
    UsersModule,
    UserStoriesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
