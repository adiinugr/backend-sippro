import { Module } from '@nestjs/common';
import { StudentsToSubjectGroupsToClassroomService } from './students-to-subject-groups-to-classroom.service';
import { StudentsToSubjectGroupsToClassroomController } from './students-to-subject-groups-to-classroom.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [StudentsToSubjectGroupsToClassroomController],
  providers: [StudentsToSubjectGroupsToClassroomService],
  imports: [DrizzleModule],
})
export class StudentsToSubjectGroupsToClassroomModule {}
