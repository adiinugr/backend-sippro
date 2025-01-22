import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Schema
import { students } from './students.schema';

export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  medal: text('medal').notNull(),
  level: text('level').notNull(),
  organizer: text('organizer').notNull(),
  date: timestamp('date', {
    mode: 'string',
  }).notNull(),
  studentId: integer('student_id').notNull(),
});

// achievements relations
export const achievementsRelations = relations(achievements, ({ one }) => ({
  student: one(students, {
    fields: [achievements.studentId],
    references: [students.id],
  }),
}));
