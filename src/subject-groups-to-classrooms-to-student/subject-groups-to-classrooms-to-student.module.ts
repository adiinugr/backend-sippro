import { Module } from '@nestjs/common';
import { SubjectGroupsToClassroomsToStudentService } from './subject-groups-to-classrooms-to-student.service';
import { SubjectGroupsToClassroomsToStudentController } from './subject-groups-to-classrooms-to-student.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [SubjectGroupsToClassroomsToStudentController],
  providers: [SubjectGroupsToClassroomsToStudentService],
  imports: [DrizzleModule],
})
export class SubjectGroupsToClassroomsToStudentModule {}
