import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';

// Module
import { ClassroomModule } from './modules/classroom/classroom.module';
import { StudentModule } from './modules/student/student.module';
import { SubjectModule } from './modules/subject/subject.module';
import { GradeModule } from './modules/grade/grade.module';
import { LessonYearModule } from './modules/lesson-year/lesson-year.module';
import { MarkModule } from './modules/mark/mark.module';
import { SubjectGroupModule } from './modules/subject-group/subject-group.module';
import { SubjectsToSubjectGroupModule } from './modules/subjects-to-subject-group/subjects-to-subject-group.module';
import { StudentsToSubjectGroupsToClassroomModule } from './modules/students-to-subject-groups-to-classroom/students-to-subject-groups-to-classroom.module';
import { ClassroomsToSubjectGroupModule } from './modules/classrooms-to-subject-group/classrooms-to-subject-group.module';
import { RoleModule } from './modules/role/role.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { AuthModule } from './modules/auth/auth.module';
import { TeachersToRolesModule } from './modules/teachers-to-roles/teachers-to-roles.module';

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
    StudentsToSubjectGroupsToClassroomModule,
    ClassroomsToSubjectGroupModule,
    RoleModule,
    TeacherModule,
    AuthModule,
    TeachersToRolesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
