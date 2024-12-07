import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Schema
import { subjectGroupsToClassroomsToStudents } from './subjectGroups.schema';
import { marks } from './marks.schema';

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  // Identity
  name: text('name').notNull(),
  nis: text('nis').notNull(),
  nisn: text('nisn').notNull(),
  placeOfBirth: text('place_of_birth').notNull(),
  dateOfBirth: timestamp('date_of_birth', {
    mode: 'string',
  }).notNull(),
  // Acoount
  email: text('email').notNull().unique(),
  password: text('password'),
});

// students relations
export const studentsRelations = relations(students, ({ many }) => ({
  subjectGroupsToClassroomsToStudents: many(
    subjectGroupsToClassroomsToStudents,
  ),
  marks: many(marks),
}));
