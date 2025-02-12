import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

// Schema
import { ruleCategories } from './ruleCategories.schema';

export const rules = pgTable('rules', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  point: integer('point').notNull(),
  ruleCategoryId: integer('rule_category_id')
    .notNull()
    .references(() => ruleCategories.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const ruleRelations = relations(rules, ({ one }) => ({
  ruleCategory: one(ruleCategories, {
    fields: [rules.ruleCategoryId],
    references: [ruleCategories.id],
  }),
}));
