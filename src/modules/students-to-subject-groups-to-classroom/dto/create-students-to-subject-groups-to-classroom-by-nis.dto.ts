import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudentsToSubjectGroupsToClassroomByNisDto {
  @IsNotEmpty()
  @IsNumber()
  classroomsToSubjectGroupId: number;

  @IsNotEmpty()
  @IsString()
  studentNis: string;

  @IsNotEmpty()
  @IsNumber()
  classroomId: number;
}
