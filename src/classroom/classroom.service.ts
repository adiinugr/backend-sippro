import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';

// Types
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { classrooms } from 'src/drizzle/schema/classrooms.schema';
import { eq } from 'drizzle-orm';

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
      with: {
        grade: true,
        subjectGroupsToClassroomsToStudents: {
          with: {
            student: true,
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
        subjectGroupsToClassroomsToStudents: {
          with: {
            student: true,
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
