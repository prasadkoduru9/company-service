import { IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  companyName: string;

  @IsString()
  companyCEO: string;

  @IsString()
  companyAddress: string;

  @IsString()
  @IsOptional()
  inceptionDate: string;
}
