import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteStudentsToSubjectGroupsToClassroomDto {
  @IsNotEmpty()
  @IsNumber()
  classroomsToSubjectGroupId: number;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}
