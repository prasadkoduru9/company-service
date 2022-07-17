import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedModule } from './feed/feed.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { databaseConfiguration } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.POSTGRES_HOST,
      host: databaseConfiguration.POSTGRES_HOST,
      port: databaseConfiguration.POSTGRES_PORT,
      username: databaseConfiguration.POSTGRES_USER,
      password: databaseConfiguration.POSTGRES_PASSWORD,
      database: databaseConfiguration.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FeedModule,
    CompanyModule,
    UserModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
