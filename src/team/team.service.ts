import { CompanyService } from './../company/company.service';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly companyService: CompanyService,
  ) {}
  async create(createTeamDto: CreateTeamDto) {
    try {
      const team = this.teamRepository.create(createTeamDto);
      await this.teamRepository.save(team);
      team.company = await this.companyService.findOne(team.companyId);
      console.log(team);
      return team;
    } catch (err) {
      console.log(err);
      if (err.code == 23505) {
        throw new ConflictException(
          'duplicate key value violates unique constraint for team name',
        );
      }
      if (err.code === '22P02') {
        throw new NotFoundException(
          'Company Id specified is not present in the company table...',
        );
      }
    }
  }

  async findAll() {
    const query = this.teamRepository.createQueryBuilder('team');

    const team = await query.getMany();
    const result = [];
    for (const e of team) {
      e.company = await this.companyService.findOne(e.companyId);
      result.push(e);
    }
    return result;
  }

  async findOne(id: string) {
    const team = await this.teamRepository.findOneBy({ id: id });
    if (!team) {
      throw new NotFoundException(`company with ${id} is not found!!`);
    }
    team.company = await this.companyService.findOne(team.companyId);

    return team;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  async remove(id: string) {
    const company = await this.teamRepository.delete(id);
    if (company.affected === 0) {
      throw new NotFoundException(`team with ${id} is not found!!`);
    }
    return 'Record deleted successfully....';
  }
}
