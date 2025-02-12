import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

// Schema
import { rules } from 'src/drizzle/schema/rules.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class RuleService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createRuleDto: CreateRuleDto) {
    const createdRules = await this.db
      .insert(rules)
      .values(createRuleDto)
      .returning();
    return createdRules.pop();
  }

  async findAll() {
    const rules = await this.db.query.rules.findMany({
      with: {
        ruleCategory: true,
      },
    });

    return rules;
  }

  async findOne(id: number) {
    const rule = await this.db.query.rules.findFirst({
      where: (rules, { eq }) => eq(rules.id, id),
      with: {
        ruleCategory: true,
      },
    });

    if (!rule) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return rule;
  }

  async update(id: number, updateRuleDto: UpdateRuleDto) {
    const updatedRule = await this.db
      .update(rules)
      .set(updateRuleDto)
      .where(eq(rules.id, id))
      .returning();

    if (updatedRule.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return updatedRule.pop();
  }

  async remove(id: number) {
    const deletedRule = await this.db
      .delete(rules)
      .where(eq(rules.id, id))
      .returning();

    if (deletedRule.length === 0) {
      throw new NotFoundException('Data tidak ditemukan!');
    }

    return deletedRule.pop();
  }
}
