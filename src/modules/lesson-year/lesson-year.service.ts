import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonYearDto } from './dto/create-lesson-year.dto';
import { UpdateLessonYearDto } from './dto/update-lesson-year.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { lessonYears } from 'src/drizzle/schema/lessonYears.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class LessonYearService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createLessonYearDto: CreateLessonYearDto) {
    const createdLessonYears = await this.db
      .insert(lessonYears)
      .values(createLessonYearDto)
      .returning();
    return createdLessonYears.pop();
  }

  async findAll() {
    const lessonYears = await this.db.query.lessonYears.findMany({
      orderBy: (lessonYears, { asc }) => [asc(lessonYears.name)],
    });

    return lessonYears;
  }

  async findOne(id: number) {
    const lessonYear = await this.db.query.lessonYears.findFirst({
      where: (lessonYears, { eq }) => eq(lessonYears.id, id),
    });

    if (!lessonYear) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return lessonYear;
  }

  async update(id: number, updateLessonYearDto: UpdateLessonYearDto) {
    const updatedLessonYears = await this.db
      .update(lessonYears)
      .set(updateLessonYearDto)
      .where(eq(lessonYears.id, id))
      .returning();

    if (updatedLessonYears.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedLessonYears.pop();
  }

  async remove(id: number) {
    const deletedLessonYear = await this.db
      .delete(lessonYears)
      .where(eq(lessonYears.id, id))
      .returning();

    if (deletedLessonYear.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedLessonYear.pop();
  }
}
