import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMarkDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsNotEmpty()
  @IsNumber()
  subjectGroupId: number;

  @IsNotEmpty()
  @IsString()
  semester: string;

  @IsNotEmpty()
  @IsNumber()
  mark: number;
}
