import { PartialType } from '@nestjs/mapped-types';
import { CreateClassroomsToSubjectGroupDto } from './create-classrooms-to-subject-group.dto';

export class UpdateClassroomsToSubjectGroupDto extends PartialType(
  CreateClassroomsToSubjectGroupDto,
) {}
