import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from 'drizzle-orm/pg-core';

import { subjectGroups } from './subjectGroups.schema';
import { marks } from './marks.schema';

export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey(),
  code: text('code').notNull().unique(),
  name: text('name').notNull().unique(),
});

// subjects relations
export const subjectsRelations = relations(subjects, ({ many }) => ({
  marks: many(marks),
  subjectsToSubjectGroups: many(subjectsToSubjectGroups),
}));

// subjects to subject groups Join Table
export const subjectsToSubjectGroups = pgTable(
  'subject_to_subject_groups',
  {
    subjectOrder: integer('subject_order').notNull(),
    subjectId: integer('subject_id')
      .notNull()
      .references(() => subjects.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    subjectGroupId: integer('subject_group_id')
      .notNull()
      .references(() => subjectGroups.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.subjectId, table.subjectGroupId],
    }),
  }),
);

// subjects to subjectGroups Relations
export const subjectsToSubjectGroupsRelations = relations(
  subjectsToSubjectGroups,
  ({ one }) => ({
    subject: one(subjects, {
      fields: [subjectsToSubjectGroups.subjectId],
      references: [subjects.id],
    }),
    subjectGroup: one(subjectGroups, {
      fields: [subjectsToSubjectGroups.subjectGroupId],
      references: [subjectGroups.id],
    }),
  }),
);
