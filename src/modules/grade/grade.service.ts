import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

import { grades } from 'src/drizzle/schema/grades.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { eq } from 'drizzle-orm';

@Injectable()
export class GradeService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createGradeDto: CreateGradeDto) {
    const createdGrades = await this.db
      .insert(grades)
      .values(createGradeDto)
      .returning();
    return createdGrades.pop();
  }

  async findAll() {
    const grades = await this.db.query.grades.findMany({
      with: {
        classrooms: true,
      },
    });

    return grades;
  }

  async findOne(id: number) {
    const grade = await this.db.query.grades.findFirst({
      where: (grades, { eq }) => eq(grades.id, id),
      with: {
        classrooms: true,
      },
    });

    if (!grade) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return grade;
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    const updatedGrades = await this.db
      .update(grades)
      .set(updateGradeDto)
      .where(eq(grades.id, id))
      .returning();

    if (updatedGrades.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedGrades.pop();
  }

  async remove(id: number) {
    const deletedGrade = await this.db
      .delete(grades)
      .where(eq(grades.id, id))
      .returning();

    if (deletedGrade.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedGrade.pop();
  }
}
