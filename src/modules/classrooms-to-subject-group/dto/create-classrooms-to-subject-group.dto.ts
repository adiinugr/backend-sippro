import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClassroomsToSubjectGroupDto {
  @IsNotEmpty()
  @IsNumber()
  subjectGroupId: number;

  @IsNotEmpty()
  @IsNumber()
  classroomId: number;
}
