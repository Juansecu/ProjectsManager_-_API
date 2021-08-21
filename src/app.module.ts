import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CompaniesModule } from './companies/companies.module';
import { ProjectsModule } from './projects/projects.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { UserHistoriesModule } from './user-histories/user-histories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database: process.env.DATABASE_NAME,
      dropSchema: true,
      entities: [__dirname + '/**/**/*.entity.{ts,js}'],
      host: process.env.DATABASE_HOST,
      migrationsRun: true,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT, 10),
      synchronize: true,
      type: 'mysql',
      username: process.env.DATABASE_USER
    }),
    CompaniesModule,
    ProjectsModule,
    TicketsModule,
    UsersModule,
    UserHistoriesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
