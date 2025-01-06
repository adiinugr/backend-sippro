import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { marks } from 'src/drizzle/schema/marks.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class MarkService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createMarkDto: CreateMarkDto) {
    const createdMarks = await this.db
      .insert(marks)
      .values(createMarkDto)
      .returning();
    return createdMarks.pop();
  }

  async findAll() {
    const marks = await this.db.query.marks.findMany({});

    return marks;
  }

  async findOne(id: number) {
    const mark = await this.db.query.marks.findFirst({
      where: (marks, { eq }) => eq(marks.id, id),
    });

    if (!mark) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return mark;
  }

  async update(id: number, updateMarkDto: UpdateMarkDto) {
    const updatedMarks = await this.db
      .update(marks)
      .set(updateMarkDto)
      .where(eq(marks.id, id))
      .returning();

    if (updatedMarks.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedMarks.pop();
  }

  async remove(studentId: number, subjectGroupId: number) {
    const deletedMark = await this.db
      .delete(marks)
      .where(
        and(
          eq(marks.studentId, studentId),
          eq(marks.subjectGroupId, subjectGroupId),
        ),
      )
      .returning();

    if (deletedMark.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedMark.pop();
  }
}
