import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from 'drizzle-orm/pg-core';

// Schema
import { subjectsToSubjectGroups } from './subjects.schema';
import { grades } from './grades.schema';
import { classrooms } from './classrooms.schema';
import { lessonYears } from './lessonYears.schema';
import { students } from './students.schema';
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
    subjectGroupsToClassroomsToStudents: many(
      subjectGroupsToClassroomsToStudents,
    ),
    marks: many(marks),
    subjectsToSubjectGroups: many(subjectsToSubjectGroups),
  }),
);

// subjectGroups to classrooms to students Join Table
export const subjectGroupsToClassroomsToStudents = pgTable(
  'subject_groups_to_classrooms_to_students',
  {
    subjectGroupId: integer('subject_group_id')
      .notNull()
      .references(() => subjectGroups.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    classroomId: integer('classroom_id')
      .notNull()
      .references(() => classrooms.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    studentId: integer('student_id')
      .notNull()
      .references(() => students.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.subjectGroupId, table.classroomId, table.studentId],
    }),
  }),
);

// subjects to subjectGroups Relations
export const subjectGroupsToClassroomsToStudentsRelations = relations(
  subjectGroupsToClassroomsToStudents,
  ({ one }) => ({
    subjectGroup: one(subjectGroups, {
      fields: [subjectGroupsToClassroomsToStudents.subjectGroupId],
      references: [subjectGroups.id],
    }),
    classroom: one(classrooms, {
      fields: [subjectGroupsToClassroomsToStudents.classroomId],
      references: [classrooms.id],
    }),
    student: one(students, {
      fields: [subjectGroupsToClassroomsToStudents.studentId],
      references: [students.id],
    }),
  }),
);
