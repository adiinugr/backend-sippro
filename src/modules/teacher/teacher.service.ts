import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { teachers, teachersToRoles } from 'src/drizzle/schema/teachers.schema';
import { eq } from 'drizzle-orm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { name, placeOfBirth, dateOfBirth, status, email, password } =
      createTeacherDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacherData = {
      name,
      placeOfBirth,
      dateOfBirth,
      status,
      email,
      password: hashedPassword,
    };

    const createdTeachers = await this.db
      .insert(teachers)
      .values(teacherData)
      .returning({
        id: teachers.id,
        email: teachers.email,
        name: teachers.name,
      });
    return createdTeachers.pop();
  }

  async findAll() {
    const teachers = await this.db.query.teachers.findMany({
      with: {
        teachersToRoles: {
          with: {
            roles: {
              with: {
                rolesToPermissions: {
                  with: {
                    permissions: true,
                  },
                },
              },
            },
          },
        },
      },
      columns: {
        password: false,
      },
    });

    return teachers;
  }

  async findAllWithRoles() {
    const teachers = await this.db.query.teachers.findMany({
      with: {
        teachersToRoles: {
          with: {
            roles: true,
          },
        },
      },
      columns: {
        password: false,
      },
      where: (teachers, { exists, eq }) =>
        exists(
          this.db
            .select()
            .from(teachersToRoles)
            .where(eq(teachersToRoles.teacherId, teachers.id)),
        ),
    });

    return teachers;
  }

  async findOne(id: number) {
    const teacher = await this.db.query.teachers.findFirst({
      with: {
        teachersToRoles: {
          with: {
            roles: {
              with: {
                rolesToPermissions: {
                  with: {
                    permissions: true,
                  },
                },
              },
            },
          },
        },
      },
      columns: {
        password: false,
      },
      where: (teachers, { eq }) => eq(teachers.id, id),
    });

    if (!teacher) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const updatedTeachers = await this.db
      .update(teachers)
      .set(updateTeacherDto)
      .where(eq(teachers.id, id))
      .returning();

    if (updatedTeachers.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedTeachers.pop();
  }

  async remove(id: number) {
    const deletedTeacher = await this.db
      .delete(teachers)
      .where(eq(teachers.id, id))
      .returning();

    if (deletedTeacher.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedTeacher.pop();
  }
}
