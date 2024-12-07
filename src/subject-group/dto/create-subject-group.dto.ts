import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubjectGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  gradeId: number;

  @IsNumber()
  @IsNotEmpty()
  lessonYearId: number;
}
