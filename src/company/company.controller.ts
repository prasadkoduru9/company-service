import { AuthGuard } from '@nestjs/passport';
import { GetCompanyDto } from './dto/get-company.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('company')
@ApiTags('company')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll(@Query() filterDto: GetCompanyDto): Promise<Company[]> {
    return this.companyService.findAll(filterDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.companyService.remove(id);
  }
}
