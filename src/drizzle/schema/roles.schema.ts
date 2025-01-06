import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// Schema
import { teachersToRoles } from 'src/drizzle/schema/teachers.schema';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
});

// roles relations
export const roleRelations = relations(roles, ({ many }) => ({
  teachersToRoles: many(teachersToRoles),
}));
