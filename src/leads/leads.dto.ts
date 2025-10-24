import { IsString, IsOptional, IsIn } from 'class-validator';

export class LeadDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsIn(['new', 'working', 'qualified', 'disqualified'])
  status?: string;
}
