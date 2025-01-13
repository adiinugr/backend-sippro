import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentsToSubjectGroupsToClassroomDto } from './dto/create-students-to-subject-groups-to-classroom.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

import { and, eq } from 'drizzle-orm';
import { stdsToSbjgsToClsrms } from 'src/drizzle/schema/students.schema';
import { classrooms } from 'src/drizzle/schema/classrooms.schema';
import { DeleteStudentsToSubjectGroupsToClassroomDto } from 'src/modules/students-to-subject-groups-to-classroom/dto/delete-students-to-subject-groups-to-classroom.dto';
import { CreateStudentsToSubjectGroupsToClassroomByNisDto } from 'src/modules/students-to-subject-groups-to-classroom/dto/create-students-to-subject-groups-to-classroom-by-nis.dto';

@Injectable()
export class StudentsToSubjectGroupsToClassroomService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(
    createStudentsToSubjectGroupsToClassroomsDto: CreateStudentsToSubjectGroupsToClassroomDto,
  ) {
    const studentById = await this.db.query.students.findFirst({
      where: (students, { eq }) =>
        eq(students.id, createStudentsToSubjectGroupsToClassroomsDto.studentId),
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

    const mappedStudentById = studentById.stTSbgTc.map((item) => {
      return item.clsrmsToSbjg.classroom.gradeId;
    });

    const classroomById = await this.db
      .select()
      .from(classrooms)
      .where(
        eq(
          classrooms.id,
          createStudentsToSubjectGroupsToClassroomsDto.classroomId,
        ),
      );

    const classroomGradeId = classroomById[0].gradeId;

    if (mappedStudentById.includes(classroomGradeId)) {
      throw new BadRequestException(
        `${studentById.name} sudah ditambahkan di kelas lain pada jenjang yang sama!`,
      );
    }

    const createdSubjectGroupsToClassroomToStudent = await this.db
      .insert(stdsToSbjgsToClsrms)
      .values({
        studentId: createStudentsToSubjectGroupsToClassroomsDto.studentId,
        clsrmToSbjgId:
          createStudentsToSubjectGroupsToClassroomsDto.classroomsToSubjectGroupId,
      })
      .returning();
    return createdSubjectGroupsToClassroomToStudent.pop();
  }

  async createByNis(
    createStudentsToSubjectGroupsToClassroomsByNisDto: CreateStudentsToSubjectGroupsToClassroomByNisDto,
  ) {
    const studentByNis = await this.db.query.students.findFirst({
      where: (students, { eq }) =>
        eq(
          students.nis,
          createStudentsToSubjectGroupsToClassroomsByNisDto.studentNis,
        ),
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

    const mappedStudentByNis = studentByNis.stTSbgTc.map((item) => {
      return item.clsrmsToSbjg.classroom.gradeId;
    });

    const classroomById = await this.db
      .select()
      .from(classrooms)
      .where(
        eq(
          classrooms.id,
          createStudentsToSubjectGroupsToClassroomsByNisDto.classroomId,
        ),
      );

    const classroomGradeId = classroomById[0].gradeId;

    if (mappedStudentByNis.includes(classroomGradeId)) {
      throw new BadRequestException(
        `${studentByNis.name} sudah ditambahkan di kelas lain pada jenjang yang sama!`,
      );
    }

    const createdSubjectGroupsToClassroomToStudent = await this.db
      .insert(stdsToSbjgsToClsrms)
      .values({
        studentId: studentByNis.id,
        clsrmToSbjgId:
          createStudentsToSubjectGroupsToClassroomsByNisDto.classroomsToSubjectGroupId,
      })
      .returning();
    return createdSubjectGroupsToClassroomToStudent.pop();
  }

  async remove(
    deleteStudentsToSubjectGroupsToClassroomDto: DeleteStudentsToSubjectGroupsToClassroomDto,
  ) {
    const deletedData = await this.db
      .delete(stdsToSbjgsToClsrms)
      .where(
        and(
          eq(
            stdsToSbjgsToClsrms.clsrmToSbjgId,
            deleteStudentsToSubjectGroupsToClassroomDto.classroomsToSubjectGroupId,
          ),
          eq(
            stdsToSbjgsToClsrms.studentId,
            deleteStudentsToSubjectGroupsToClassroomDto.studentId,
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
