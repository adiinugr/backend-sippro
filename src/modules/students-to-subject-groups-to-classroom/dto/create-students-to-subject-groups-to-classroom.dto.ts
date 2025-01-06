import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentsToSubjectGroupsToClassroomDto {
  @IsNotEmpty()
  @IsNumber()
  classroomsToSubjectGroupId: number;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  classroomId: number;
}
