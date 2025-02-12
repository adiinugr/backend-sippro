import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

// Schema
import { rules } from './rules.schema';
import { students } from './students.schema';

// violations Join Table
export const violations = pgTable('violations', {
  id: serial('id').primaryKey(),
  date: timestamp('date', {
    mode: 'string',
  }).notNull(),
  studentId: integer('student_id').notNull(),
  ruleId: integer('rule_id')
    .notNull()
    .references(() => rules.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

// violations Relations
export const violationRelations = relations(violations, ({ one }) => ({
  student: one(students, {
    fields: [violations.studentId],
    references: [students.id],
  }),
  rule: one(rules, {
    fields: [violations.ruleId],
    references: [rules.id],
  }),
}));
