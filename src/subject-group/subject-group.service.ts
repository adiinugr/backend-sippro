import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubjectGroupDto } from './dto/create-subject-group.dto';
import { UpdateSubjectGroupDto } from './dto/update-subject-group.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { subjectGroups } from 'src/drizzle/schema/subjectGroups.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class SubjectGroupService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createSubjectGroupDto: CreateSubjectGroupDto) {
    const insertedSubjectGroup = await this.db.query.subjectGroups.findFirst({
      where: and(
        eq(subjectGroups.name, createSubjectGroupDto.name),
        eq(subjectGroups.gradeId, createSubjectGroupDto.gradeId),
        eq(subjectGroups.lessonYearId, createSubjectGroupDto.lessonYearId),
      ),
    });

    if (insertedSubjectGroup) {
      throw new BadRequestException('Kelompok mapel sudah terdaftar!');
    }

    const createdSubjectGroups = await this.db
      .insert(subjectGroups)
      .values(createSubjectGroupDto)
      .returning();
    return createdSubjectGroups.pop();
  }

  async findAll() {
    const subjectGroups = await this.db.query.subjectGroups.findMany({
      with: {
        lessonYear: true,
        grade: true,
        subjectsToSubjectGroups: {
          with: {
            subject: true,
          },
        },
        subjectGroupsToClassroomsToStudents: {
          with: {
            classroom: true,
            student: true,
          },
        },
      },
    });

    return subjectGroups;
  }

  async findOne(id: number) {
    const subjectGroup = await this.db.query.subjectGroups.findFirst({
      where: (subjectGroups, { eq }) => eq(subjectGroups.id, id),
      with: {
        grade: true,
        lessonYear: true,
        subjectsToSubjectGroups: {
          with: {
            subject: true,
          },
        },
        subjectGroupsToClassroomsToStudents: {
          with: {
            classroom: true,
            student: true,
          },
        },
      },
    });

    if (!subjectGroup) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return subjectGroup;
  }

  async update(id: number, updateSubjectGroupDto: UpdateSubjectGroupDto) {
    const updatedSubjectGroup = await this.db
      .update(subjectGroups)
      .set(updateSubjectGroupDto)
      .where(eq(subjectGroups.id, id))
      .returning();

    if (updatedSubjectGroup.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedSubjectGroup.pop();
  }

  async remove(id: number) {
    const deletedSubjectGroup = await this.db
      .delete(subjectGroups)
      .where(eq(subjectGroups.id, id))
      .returning();

    if (deletedSubjectGroup.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedSubjectGroup.pop();
  }
}
