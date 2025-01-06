import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassroomsToSubjectGroupDto } from './dto/create-classrooms-to-subject-group.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { clsrmsToSbjgs } from 'src/drizzle/schema/classrooms.schema';

import { and, eq } from 'drizzle-orm';

@Injectable()
export class ClassroomsToSubjectGroupService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(
    createClassroomsToSubjectGroupDto: CreateClassroomsToSubjectGroupDto,
  ) {
    const createdClassroomsSubjectGroups = await this.db
      .insert(clsrmsToSbjgs)
      .values(createClassroomsToSubjectGroupDto)
      .returning();
    return createdClassroomsSubjectGroups.pop();
  }

  async findOneByClassromAndSubjectGroupId(
    classroomId: number,
    subjectGroupId: number,
  ) {
    const selectedData = await this.db
      .select()
      .from(clsrmsToSbjgs)
      .where(
        and(
          eq(clsrmsToSbjgs.classroomId, classroomId),
          eq(clsrmsToSbjgs.subjectGroupId, subjectGroupId),
        ),
      );

    return selectedData;
  }

  async remove(subjectGroupId: number) {
    const deletedClassroomToSubjectGroup = await this.db
      .delete(clsrmsToSbjgs)
      .where(eq(clsrmsToSbjgs.subjectGroupId, subjectGroupId))
      .returning();

    if (deletedClassroomToSubjectGroup.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedClassroomToSubjectGroup.pop();
  }
}
