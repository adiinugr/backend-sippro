import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// Schema
import { subjectGroups } from './subjectGroups.schema';
import { classrooms } from './classrooms.schema';

export const grades = pgTable('grades', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
});

// grades relations
export const gradesRelations = relations(grades, ({ many }) => ({
  classrooms: many(classrooms),
  subjectGroups: many(subjectGroups),
}));
