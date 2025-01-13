import { Controller, Post, Body, Delete } from '@nestjs/common';
import { CreateStudentsToSubjectGroupsToClassroomDto } from './dto/create-students-to-subject-groups-to-classroom.dto';
import { StudentsToSubjectGroupsToClassroomService } from 'src/modules/students-to-subject-groups-to-classroom/students-to-subject-groups-to-classroom.service';
import { DeleteStudentsToSubjectGroupsToClassroomDto } from 'src/modules/students-to-subject-groups-to-classroom/dto/delete-students-to-subject-groups-to-classroom.dto';
import { CreateStudentsToSubjectGroupsToClassroomByNisDto } from 'src/modules/students-to-subject-groups-to-classroom/dto/create-students-to-subject-groups-to-classroom-by-nis.dto';

@Controller('students-to-subject-groups-to-classroom')
export class StudentsToSubjectGroupsToClassroomController {
  constructor(
    private readonly studentsToSubjectGroupsToClassroomService: StudentsToSubjectGroupsToClassroomService,
  ) {}

  @Post()
  create(
    @Body()
    createStudentsToSubjectGroupsToClassroomsDto: CreateStudentsToSubjectGroupsToClassroomDto,
  ) {
    return this.studentsToSubjectGroupsToClassroomService.create(
      createStudentsToSubjectGroupsToClassroomsDto,
    );
  }

  @Post('nis')
  createByNis(
    @Body()
    createStudentsToSubjectGroupsToClassroomsByNisDto: CreateStudentsToSubjectGroupsToClassroomByNisDto,
  ) {
    return this.studentsToSubjectGroupsToClassroomService.createByNis(
      createStudentsToSubjectGroupsToClassroomsByNisDto,
    );
  }

  @Delete()
  remove(
    @Body()
    deleteStudentsToSubjectGroupsToClassroomsDto: DeleteStudentsToSubjectGroupsToClassroomDto,
  ) {
    return this.studentsToSubjectGroupsToClassroomService.remove(
      deleteStudentsToSubjectGroupsToClassroomsDto,
    );
  }
}
