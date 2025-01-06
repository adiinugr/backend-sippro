import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

// Schema
import { subjectGroups } from './subjectGroups.schema';
import { grades } from './grades.schema';
import { stdsToSbjgsToClsrms } from './students.schema';

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
  clsrmsToSbjgs: many(clsrmsToSbjgs),
}));

// classrooms to subject groups Join Table
export const clsrmsToSbjgs = pgTable('clsrm_to_sbjgs', {
  id: serial('id').primaryKey(),
  classroomId: integer('classroom_id').notNull(),
  subjectGroupId: integer('subject_group_id').notNull(),
});

// classrooms to subjectGroups Relations
export const clsrmsToSbjgsRelations = relations(
  clsrmsToSbjgs,
  ({ one, many }) => ({
    classroom: one(classrooms, {
      fields: [clsrmsToSbjgs.classroomId],
      references: [classrooms.id],
    }),
    subjectGroup: one(subjectGroups, {
      fields: [clsrmsToSbjgs.subjectGroupId],
      references: [subjectGroups.id],
    }),
    stdsToSbjgsToClsrms: many(stdsToSbjgsToClsrms),
  }),
);
