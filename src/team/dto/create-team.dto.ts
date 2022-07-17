import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from 'src/company/entities/company.entity';

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  teamName: string;

  @ApiProperty()
  @IsString()
  teamLeadName: string;

  @ApiProperty()
  companyId: string;
}
