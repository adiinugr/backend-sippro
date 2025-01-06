import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ClassroomsToSubjectGroupService } from './classrooms-to-subject-group.service';
import { CreateClassroomsToSubjectGroupDto } from './dto/create-classrooms-to-subject-group.dto';

@Controller('classrooms-to-subject-group')
export class ClassroomsToSubjectGroupController {
  constructor(
    private readonly classroomsToSubjectGroupService: ClassroomsToSubjectGroupService,
  ) {}

  @Post()
  create(
    @Body()
    createClassroomsToSubjectGroupDto: CreateClassroomsToSubjectGroupDto,
  ) {
    return this.classroomsToSubjectGroupService.create(
      createClassroomsToSubjectGroupDto,
    );
  }

  @Get(':classroomId/:subjectGroupId')
  findOneByClassromAndSubjectGroupId(
    @Param('classroomId') classroomId: number,
    @Param('subjectGroupId') subjectGroupId: number,
  ) {
    return this.classroomsToSubjectGroupService.findOneByClassromAndSubjectGroupId(
      classroomId,
      subjectGroupId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomsToSubjectGroupService.remove(+id);
  }
}
