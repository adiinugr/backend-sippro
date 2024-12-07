import { eq } from 'drizzle-orm';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { students } from 'src/drizzle/schema/students.schema';

@Injectable()
export class StudentService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createStudentDto: CreateStudentDto) {
    const createdStudents = await this.db
      .insert(students)
      .values(createStudentDto)
      .returning();
    return createdStudents.pop();
  }

  async findAll() {
    const students = await this.db.query.students.findMany({
      with: {
        subjectGroupsToClassroomsToStudents: {
          with: {
            classroom: true,
            subjectGroup: {
              with: {
                lessonYear: true,
                grade: true,
              },
            },
          },
        },
      },
    });

    return students;
  }

  async findOne(id: number) {
    const student = await this.db.query.students.findFirst({
      where: (students, { eq }) => eq(students.id, id),
      with: {
        subjectGroupsToClassroomsToStudents: {
          with: {
            classroom: true,
            subjectGroup: {
              with: {
                lessonYear: true,
                grade: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const updatedStudents = await this.db
      .update(students)
      .set(updateStudentDto)
      .where(eq(students.id, id))
      .returning();

    if (updatedStudents.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedStudents.pop();
  }

  async remove(id: number) {
    const deletedStudent = await this.db
      .delete(students)
      .where(eq(students.id, id))
      .returning();

    if (deletedStudent.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedStudent.pop();
  }
}
