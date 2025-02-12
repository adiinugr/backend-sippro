import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

// Schema
import { marks } from './marks.schema';
import { clsrmsToSbjgs } from './classrooms.schema';
import { achievements } from './achievements.schema';
import { violations } from './violations.schema';

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
  status: text('status').notNull().default('student'),
  // Acoount
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

// students relations
export const studentsRelations = relations(students, ({ many }) => ({
  // stTSbTc means studentsToSubjectGroupsToClassrooms

  stTSbgTc: many(stdsToSbjgsToClsrms),
  marks: many(marks),
  achievements: many(achievements),
  violations: many(violations),
}));

// students to subject groups to classrooms Join Table
export const stdsToSbjgsToClsrms = pgTable(
  'stds_to_sbjgs_to_clsrms',
  {
    studentId: integer('student_id')
      .notNull()
      .references(() => students.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    clsrmToSbjgId: integer('clsrm_to_sbjg_id')
      .notNull()
      .references(() => clsrmsToSbjgs.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.studentId, table.clsrmToSbjgId],
    }),
  }),
);

// students to subject groups to classrooms Relations
export const stdsToSbjgsToClsrmsRelations = relations(
  stdsToSbjgsToClsrms,
  ({ one }) => ({
    student: one(students, {
      fields: [stdsToSbjgsToClsrms.studentId],
      references: [students.id],
    }),
    clsrmsToSbjg: one(clsrmsToSbjgs, {
      fields: [stdsToSbjgsToClsrms.clsrmToSbjgId],
      references: [clsrmsToSbjgs.id],
    }),
  }),
);
