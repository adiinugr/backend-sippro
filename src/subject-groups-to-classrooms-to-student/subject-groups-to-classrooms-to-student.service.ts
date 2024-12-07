import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectGroupsToClassroomsToStudentDto } from './dto/create-subject-groups-to-classrooms-to-student.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { subjectGroupsToClassroomsToStudents } from 'src/drizzle/schema/subjectGroups.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class SubjectGroupsToClassroomsToStudentService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(
    createSubjectGroupsToClassroomsToStudentDto: CreateSubjectGroupsToClassroomsToStudentDto,
  ) {
    const createdSubjectGroupsToClassroomToStudent = await this.db
      .insert(subjectGroupsToClassroomsToStudents)
      .values(createSubjectGroupsToClassroomsToStudentDto)
      .returning();
    return createdSubjectGroupsToClassroomToStudent.pop();
  }

  async remove(
    createSubjectGroupsToClassroomsToStudentDto: CreateSubjectGroupsToClassroomsToStudentDto,
  ) {
    const deletedData = await this.db
      .delete(subjectGroupsToClassroomsToStudents)
      .where(
        and(
          eq(
            subjectGroupsToClassroomsToStudents.subjectGroupId,
            createSubjectGroupsToClassroomsToStudentDto.subjectGroupId,
          ),
          eq(
            subjectGroupsToClassroomsToStudents.classroomId,
            createSubjectGroupsToClassroomsToStudentDto.classroomId,
          ),
          eq(
            subjectGroupsToClassroomsToStudents.studentId,
            createSubjectGroupsToClassroomsToStudentDto.studentId,
          ),
        ),
      )
      .returning();

    if (deletedData.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedData.pop();
  }
}
