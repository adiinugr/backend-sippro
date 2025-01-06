import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { eq } from 'drizzle-orm';

// DTO
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

// Schema
import { classrooms } from 'src/drizzle/schema/classrooms.schema';

// Types
import { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class ClassroomService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createClassroomDto: CreateClassroomDto) {
    const createdClassrooms = await this.db
      .insert(classrooms)
      .values(createClassroomDto)
      .returning();
    return createdClassrooms.pop();
  }

  async findAll() {
    const classrooms = await this.db.query.classrooms.findMany({
      orderBy: (classrooms, { asc }) => [asc(classrooms.name)],
      with: {
        grade: true,
        clsrmsToSbjgs: {
          with: {
            stdsToSbjgsToClsrms: {
              with: {
                student: true,
              },
            },
          },
        },
      },
    });

    return classrooms;
  }

  async findOne(id: number) {
    const classroom = await this.db.query.classrooms.findFirst({
      where: (classrooms, { eq }) => eq(classrooms.id, id),
      with: {
        grade: true,
        clsrmsToSbjgs: {
          with: {
            stdsToSbjgsToClsrms: {
              with: {
                student: true,
              },
            },
          },
        },
      },
    });

    if (!classroom) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return classroom;
  }

  async update(id: number, updateClassroomDto: UpdateClassroomDto) {
    const updatedClassrooms = await this.db
      .update(classrooms)
      .set(updateClassroomDto)
      .where(eq(classrooms.id, id))
      .returning();

    if (updatedClassrooms.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedClassrooms.pop();
  }

  async remove(id: number) {
    const deletedClassroom = await this.db
      .delete(classrooms)
      .where(eq(classrooms.id, id))
      .returning();

    if (deletedClassroom.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedClassroom.pop();
  }
}
