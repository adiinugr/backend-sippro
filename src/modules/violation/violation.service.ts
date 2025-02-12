import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateViolationDto } from './dto/cretae-violation.dto';
import { UpdateViolationDto } from './dto/update-violation.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { and, eq } from 'drizzle-orm';

// Schema
import { violations } from 'src/drizzle/schema/violations.schema';

@Injectable()
export class ViolationService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createViolationDto: CreateViolationDto) {
    const createViolation = await this.db
      .insert(violations)
      .values(createViolationDto)
      .returning();

    return createViolation.pop();
  }

  async findAll() {
    const violations = await this.db.query.violations.findMany({
      orderBy: (violations, { desc }) => [desc(violations.date)],
      with: {
        student: {
          with: {
            stTSbgTc: {
              with: {
                clsrmsToSbjg: {
                  with: {
                    subjectGroup: {
                      with: {
                        lessonYear: true,
                      },
                    },
                    classroom: true,
                  },
                },
              },
            },
          },
          columns: {
            password: false,
          },
        },
        rule: true,
      },
    });

    return violations;
  }

  async findOne(id: number) {
    const violation = await this.db.query.violations.findFirst({
      where: (violations, { eq }) => eq(violations.id, id),
      with: {
        student: {
          columns: {
            password: false,
          },
        },
        rule: {
          with: {
            ruleCategory: true,
          },
        },
      },
    });

    return violation;
  }

  async update(id: number, updateViolationDto: UpdateViolationDto) {
    const updatedViolation = await this.db
      .update(violations)
      .set(updateViolationDto)
      .where(eq(violations.id, id))
      .returning();

    if (updatedViolation.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedViolation.pop();
  }

  async remove(id: number) {
    const deletedViolation = await this.db
      .delete(violations)
      .where(and(eq(violations.id, id)))
      .returning();

    if (deletedViolation.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedViolation.pop();
  }
}
