import { CompanyModule } from './../company/company.module';
import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), UserModule, CompanyModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
