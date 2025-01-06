import { Module } from '@nestjs/common';
import { ClassroomsToSubjectGroupService } from './classrooms-to-subject-group.service';
import { ClassroomsToSubjectGroupController } from './classrooms-to-subject-group.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [ClassroomsToSubjectGroupController],
  providers: [ClassroomsToSubjectGroupService],
  imports: [DrizzleModule],
})
export class ClassroomsToSubjectGroupModule {}
