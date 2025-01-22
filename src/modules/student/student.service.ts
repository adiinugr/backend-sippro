import { eq } from 'drizzle-orm';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { students } from 'src/drizzle/schema/students.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createStudentDto: CreateStudentDto) {
    const {
      name,
      nis,
      nisn,
      placeOfBirth,
      dateOfBirth,
      status,
      email,
      password,
    } = createStudentDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const studentData = {
      name,
      nis,
      nisn,
      placeOfBirth,
      dateOfBirth,
      status,
      email,
      password: hashedPassword,
    };

    const createdStudents = await this.db
      .insert(students)
      .values(studentData)
      .returning({
        id: students.id,
        email: students.email,
        name: students.name,
      });
    return createdStudents.pop();
  }

  async findAll() {
    const students = await this.db.query.students.findMany({
      columns: {
        password: false,
      },
      with: {
        stTSbgTc: {
          with: {
            clsrmsToSbjg: {
              with: {
                classroom: true,
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
      columns: {
        password: false,
      },
      where: (students, { eq }) => eq(students.id, id),
      with: {
        achievements: true,
        marks: {
          with: {
            subject: true,
            subjectGroup: {
              with: {
                lessonYear: true,
              },
            },
          },
        },
        stTSbgTc: {
          with: {
            clsrmsToSbjg: {
              with: {
                classroom: true,
                subjectGroup: {
                  with: {
                    lessonYear: true,
                    sbjsToSbjgs: {
                      orderBy: (sbjsToSbjgs, { asc }) => [
                        asc(sbjsToSbjgs.subjectOrder),
                      ],
                      with: {
                        subject: true,
                      },
                    },
                  },
                },
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
