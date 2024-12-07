import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubjectsToSubjectGroupDto {
  @IsNotEmpty()
  @IsNumber()
  subjectOrder: number;

  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsNotEmpty()
  @IsNumber()
  subjectGroupId: number;
}
