import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

// Schema
import { subjects } from './subjects.schema';
import { students } from './students.schema';
import { subjectGroups } from './subjectGroups.schema';

export const marks = pgTable('marks', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').notNull(),
  subjectId: integer('subject_id').notNull(),
  subjectGroupId: integer('subject_group_id').notNull(),
  semester: text('semester').notNull(),
  mark: integer('mark').notNull(),
});

// marks relations
export const marksRelations = relations(marks, ({ one }) => ({
  student: one(students, {
    fields: [marks.studentId],
    references: [students.id],
  }),
  subject: one(subjects, {
    fields: [marks.subjectId],
    references: [subjects.id],
  }),
  subjectGroup: one(subjectGroups, {
    fields: [marks.subjectGroupId],
    references: [subjectGroups.id],
  }),
}));
