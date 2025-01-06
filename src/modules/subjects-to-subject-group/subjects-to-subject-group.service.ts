import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectsToSubjectGroupDto } from './dto/create-subjects-to-subject-group.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { sbjsToSbjgs } from 'src/drizzle/schema/subjects.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SubjectsToSubjectGroupService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(
    createSubjectsToSubjectGroupDto: CreateSubjectsToSubjectGroupDto,
  ) {
    const createdSubjectGroups = await this.db
      .insert(sbjsToSbjgs)
      .values(createSubjectsToSubjectGroupDto)
      .returning();
    return createdSubjectGroups.pop();
  }

  async findAll() {
    const subjectToSubjectGroups = await this.db.query.sbjsToSbjgs.findMany({});

    return subjectToSubjectGroups;
  }

  findOne(id: number) {
    return `This action returns a #${id} subjectsToSubjectGroup`;
  }

  // Delete subjets to subject groups by subjectGroupId

  async remove(subjectGroupId: number) {
    const deletedSubjectToSubjectGroup = await this.db
      .delete(sbjsToSbjgs)
      .where(eq(sbjsToSbjgs.subjectGroupId, subjectGroupId))
      .returning();

    if (deletedSubjectToSubjectGroup.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedSubjectToSubjectGroup.pop();
  }
}
