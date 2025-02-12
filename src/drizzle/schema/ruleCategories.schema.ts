import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// Schema
import { rules } from './rules.schema';

export const ruleCategories = pgTable('rule_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
});

// rule categories relations
export const ruleCategoriesRelations = relations(
  ruleCategories,
  ({ many }) => ({
    rules: many(rules),
  }),
);
