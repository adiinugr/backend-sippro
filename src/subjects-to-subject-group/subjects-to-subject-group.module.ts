import { Module } from '@nestjs/common';
import { SubjectsToSubjectGroupService } from './subjects-to-subject-group.service';
import { SubjectsToSubjectGroupController } from './subjects-to-subject-group.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [SubjectsToSubjectGroupController],
  providers: [SubjectsToSubjectGroupService],
  imports: [DrizzleModule],
})
export class SubjectsToSubjectGroupModule {}
