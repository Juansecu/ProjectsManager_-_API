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

const { CLEARDB_DATABASE_URL } = process.env;

const databaseCredentials = CLEARDB_DATABASE_URL.split('://').shift();
const databaseEP = databaseCredentials.split('@')[0];
const databaseHN = databaseCredentials.split('@')[1];

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database:
        databaseHN.split('/')[1].split('?')[0] || process.env.DATABASE_NAME,
      dropSchema: true,
      entities: [__dirname + '/**/**/*.entity.{ts,js}'],
      host: databaseHN.split('/')[0] || process.env.DATABASE_HOST,
      migrationsRun: true,
      password: databaseEP.split(':')[1] || process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT, 10),
      synchronize: true,
      type: 'mysql',
      username: databaseEP.split(':')[0] || process.env.DATABASE_USER
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
