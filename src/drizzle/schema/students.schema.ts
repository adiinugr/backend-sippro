import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// Schema
import { subjectGroupsToClassroomsToStudents } from './subjectGroups.schema';
import { marks } from './marks.schema';

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

// students relations
export const studentsRelations = relations(students, ({ many }) => ({
  subjectGroupsToClassroomsToStudents: many(
    subjectGroupsToClassroomsToStudents,
  ),
  marks: many(marks),
}));
