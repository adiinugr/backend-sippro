import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectsToSubjectGroupDto } from './dto/create-subjects-to-subject-group.dto';
import { UpdateSubjectsToSubjectGroupDto } from './dto/update-subjects-to-subject-group.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { subjectsToSubjectGroups } from 'src/drizzle/schema/subjects.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SubjectsToSubjectGroupService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(
    createSubjectsToSubjectGroupDto: CreateSubjectsToSubjectGroupDto,
  ) {
    const createdSubjectGroups = await this.db
      .insert(subjectsToSubjectGroups)
      .values(createSubjectsToSubjectGroupDto)
      .returning();
    return createdSubjectGroups.pop();
  }

  async findAll() {
    const subjectToSubjectGroups =
      await this.db.query.subjectsToSubjectGroups.findMany({});

    return subjectToSubjectGroups;
  }

  findOne(id: number) {
    return `This action returns a #${id} subjectsToSubjectGroup`;
  }

  update(
    id: number,
    updateSubjectsToSubjectGroupDto: UpdateSubjectsToSubjectGroupDto,
  ) {
    return `This action updates a #${id} subjectsToSubjectGroup`;
  }

  // Delete subjets to subject groups by subjectGroupId

  async remove(subjectGroupId: number) {
    const deletedSubjectToSubjectGroup = await this.db
      .delete(subjectsToSubjectGroups)
      .where(eq(subjectsToSubjectGroups.subjectGroupId, subjectGroupId))
      .returning();

    if (deletedSubjectToSubjectGroup.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedSubjectToSubjectGroup.pop();
  }
}
