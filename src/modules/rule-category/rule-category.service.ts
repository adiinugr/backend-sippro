import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRuleCategoryDto } from './dto/create-rule-category.dto';
import { UpdateRuleCategoryDto } from './dto/update-rule-category.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { ruleCategories } from 'src/drizzle/schema/ruleCategories.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class RuleCategoryService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createRuleCategoryDto: CreateRuleCategoryDto) {
    const createdRuleCategories = await this.db
      .insert(ruleCategories)
      .values(createRuleCategoryDto)
      .returning();
    return createdRuleCategories.pop();
  }

  async findAll() {
    const ruleCategories = await this.db.query.ruleCategories.findMany({});

    return ruleCategories;
  }

  async findOne(id: number) {
    const ruleCategory = await this.db.query.ruleCategories.findFirst({
      where: (ruleCategories, { eq }) => eq(ruleCategories.id, id),
    });

    if (!ruleCategory) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return ruleCategory;
  }

  async update(id: number, updateRuleCategoryDto: UpdateRuleCategoryDto) {
    const updatedRuleCategory = await this.db
      .update(ruleCategories)
      .set(updateRuleCategoryDto)
      .where(eq(ruleCategories.id, id))
      .returning();

    if (updatedRuleCategory.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedRuleCategory.pop();
  }

  async remove(id: number) {
    const deletedRuleCategory = await this.db
      .delete(ruleCategories)
      .where(eq(ruleCategories.id, id))
      .returning();

    if (deletedRuleCategory.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedRuleCategory.pop();
  }
}
