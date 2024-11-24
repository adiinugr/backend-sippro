import { eq } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

// Schema

@Injectable()
export class StudentService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll() {
    return await this.db.query.students.findMany({
      with: {
        subjectGroupsToClassroomsToStudents: {
          with: {
            classroom: true,
            subjectGroup: {
              with: {
                lessonYear: true,
                grade: true,
                subjectsToSubjectGroups: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
