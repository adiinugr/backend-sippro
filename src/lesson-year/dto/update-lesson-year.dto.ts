import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonYearDto } from './create-lesson-year.dto';

export class UpdateLessonYearDto extends PartialType(CreateLessonYearDto) {}
