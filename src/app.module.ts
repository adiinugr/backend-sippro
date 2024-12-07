import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';

// Module
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { GradeModule } from './grade/grade.module';
import { LessonYearModule } from './lesson-year/lesson-year.module';
import { MarkModule } from './mark/mark.module';
import { SubjectGroupModule } from './subject-group/subject-group.module';
import { SubjectsToSubjectGroupModule } from './subjects-to-subject-group/subjects-to-subject-group.module';
import { SubjectGroupsToClassroomsToStudentModule } from './subject-groups-to-classrooms-to-student/subject-groups-to-classrooms-to-student.module';

@Module({
  imports: [
    DrizzleModule,
    ClassroomModule,
    StudentModule,
    SubjectModule,
    GradeModule,
    LessonYearModule,
    MarkModule,
    SubjectGroupModule,
    SubjectsToSubjectGroupModule,
    SubjectGroupsToClassroomsToStudentModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
