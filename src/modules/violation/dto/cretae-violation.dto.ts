import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateViolationDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  ruleId: number;
}
