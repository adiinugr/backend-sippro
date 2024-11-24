import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// Schema
import { subjectGroupsToClassroomsToStudents } from './subjectGroups.schema';

export const classrooms = pgTable('classrooms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
});

// classrooms relations
export const classroomsRelations = relations(classrooms, ({ many }) => ({
  subjectGroupsToClassroomsToStudents: many(
    subjectGroupsToClassroomsToStudents,
  ),
}));
