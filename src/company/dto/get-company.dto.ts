import { IsOptional, IsString } from 'class-validator';

export class GetCompanyDto {
  @IsString()
  @IsOptional()
  companyName: string;
}
