import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

// Schema
import { sbjsToSbjgs } from './subjects.schema';
import { grades } from './grades.schema';
import { clsrmsToSbjgs } from './classrooms.schema';
import { lessonYears } from './lessonYears.schema';

import { marks } from './marks.schema';

export const subjectGroups = pgTable('subject_groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  gradeId: integer('grade_id').notNull(),
  lessonYearId: integer('lesson_year_id').notNull(),
});

// subjectGroups relations
export const subjectGroupsRelations = relations(
  subjectGroups,
  ({ one, many }) => ({
    grade: one(grades, {
      fields: [subjectGroups.gradeId],
      references: [grades.id],
    }),
    lessonYear: one(lessonYears, {
      fields: [subjectGroups.lessonYearId],
      references: [lessonYears.id],
    }),
    marks: many(marks),
    sbjsToSbjgs: many(sbjsToSbjgs),
    clsrmsToSbjgs: many(clsrmsToSbjgs),
  }),
);
