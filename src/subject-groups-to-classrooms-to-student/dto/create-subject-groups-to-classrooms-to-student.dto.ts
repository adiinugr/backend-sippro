import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubjectGroupsToClassroomsToStudentDto {
  @IsNotEmpty()
  @IsNumber()
  subjectGroupId: number;

  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}
