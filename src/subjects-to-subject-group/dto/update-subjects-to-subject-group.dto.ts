import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectsToSubjectGroupDto } from './create-subjects-to-subject-group.dto';

export class UpdateSubjectsToSubjectGroupDto extends PartialType(CreateSubjectsToSubjectGroupDto) {}
