import { Controller, Post, Body, Delete } from '@nestjs/common';
import { SubjectGroupsToClassroomsToStudentService } from './subject-groups-to-classrooms-to-student.service';
import { CreateSubjectGroupsToClassroomsToStudentDto } from './dto/create-subject-groups-to-classrooms-to-student.dto';

@Controller('subject-groups-to-classrooms-to-student')
export class SubjectGroupsToClassroomsToStudentController {
  constructor(
    private readonly subjectGroupsToClassroomsToStudentService: SubjectGroupsToClassroomsToStudentService,
  ) {}

  @Post()
  create(
    @Body()
    createSubjectGroupsToClassroomsToStudentDto: CreateSubjectGroupsToClassroomsToStudentDto,
  ) {
    return this.subjectGroupsToClassroomsToStudentService.create(
      createSubjectGroupsToClassroomsToStudentDto,
    );
  }

  @Delete()
  remove(
    @Body()
    createSubjectGroupsToClassroomsToStudentDto: CreateSubjectGroupsToClassroomsToStudentDto,
  ) {
    return this.subjectGroupsToClassroomsToStudentService.remove(
      createSubjectGroupsToClassroomsToStudentDto,
    );
  }
}
