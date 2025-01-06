import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { subjects } from 'src/drizzle/schema/subjects.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SubjectService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const createdSubjects = await this.db
      .insert(subjects)
      .values(createSubjectDto)
      .returning();
    return createdSubjects.pop();
  }

  async findAll() {
    const subjects = await this.db.query.subjects.findMany({
      orderBy: (subject, { asc }) => [asc(subject.name)],
    });

    return subjects;
  }

  async findOne(id: number) {
    const subject = await this.db.query.subjects.findFirst({
      where: (subjects, { eq }) => eq(subjects.id, id),
    });

    if (!subject) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const updatedSubjects = await this.db
      .update(subjects)
      .set(updateSubjectDto)
      .where(eq(subjects.id, id))
      .returning();

    if (updatedSubjects.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedSubjects.pop();
  }

  async remove(id: number) {
    const deletedSubject = await this.db
      .delete(subjects)
      .where(eq(subjects.id, id))
      .returning();

    if (deletedSubject.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedSubject.pop();
  }
}
