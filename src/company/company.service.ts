import { GetCompanyDto } from './dto/get-company.dto';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const company = this.companyRepository.create(createCompanyDto);
      await this.companyRepository.save(company);
      return company;
    } catch (err) {
      if (err.code == 23505) {
        throw new ConflictException(
          'duplicate key value violates unique constraint for company name',
        );
      }
    }
  }

  async findAll(filterDto: GetCompanyDto): Promise<Company[]> {
    const { companyName } = filterDto;
    const query = this.companyRepository.createQueryBuilder('company');
    if (companyName) {
      query.andWhere('LOWER(company.companyName) LIKE LOWER(:companyName)', {
        companyName: `%${companyName}%`,
      });
    }
    const comp = await query.getMany();
    return comp;
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ id: id });
    if (!company) {
      throw new NotFoundException(`company with ${id} is not found!!`);
    }
    return company;
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const result = await this.companyRepository.update(id, updateCompanyDto);
    if (result.affected === 0) {
      throw new NotFoundException(`company with ${id} is not found!!`);
    }
    const comp = await this.findOne(id);
    return comp;
  }

  async remove(id: string): Promise<string> {
    const company = await this.companyRepository.delete(id);
    if (company.affected === 0) {
      throw new NotFoundException(`company with ${id} is not found!!`);
    }
    return 'Record deleted successfully....';
  }
}
