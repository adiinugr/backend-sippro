import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

// Schema
import { subjectGroupsToClassroomsToStudents } from './subjectGroups.schema';
import { grades } from './grades.schema';

export const classrooms = pgTable('classrooms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  gradeId: integer('grade_id').notNull(),
});

// classrooms relations
export const classroomsRelations = relations(classrooms, ({ one, many }) => ({
  grade: one(grades, {
    fields: [classrooms.gradeId],
    references: [grades.id],
  }),
  subjectGroupsToClassroomsToStudents: many(
    subjectGroupsToClassroomsToStudents,
  ),
}));
