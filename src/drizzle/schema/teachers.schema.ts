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
import { roles } from 'src/drizzle/schema/roles.schema';

export const teachers = pgTable('teachers', {
  id: serial('id').primaryKey(),
  // Identity
  name: text('name').notNull(),
  placeOfBirth: text('place_of_birth').notNull(),
  dateOfBirth: timestamp('date_of_birth', {
    mode: 'string',
  }).notNull(),
  status: text('status').notNull().default('teacher'),
  // Acoount
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

// teachers relations
export const teachersRelations = relations(teachers, ({ many }) => ({
  teachersToRoles: many(teachersToRoles),
}));

// teachers to roles Join Table
export const teachersToRoles = pgTable(
  'teachers_to_roles',
  {
    teacherId: integer('teacher_id')
      .notNull()
      .references(() => teachers.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.teacherId, table.roleId],
    }),
  }),
);

// teachers to roles Relations
export const teachersToRolesRelations = relations(
  teachersToRoles,
  ({ one }) => ({
    teachers: one(teachers, {
      fields: [teachersToRoles.teacherId],
      references: [teachers.id],
    }),
    roles: one(roles, {
      fields: [teachersToRoles.roleId],
      references: [roles.id],
    }),
  }),
);
