import { EntityRepository, Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
  async createTask(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const newCompany = this.create(createCompanyDto);
    await this.save(newCompany);
    return newCompany;
  }
}
