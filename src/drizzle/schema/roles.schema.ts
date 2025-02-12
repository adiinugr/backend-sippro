import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  unique,
} from 'drizzle-orm/pg-core';

import { permissions } from 'src/drizzle/schema/permissions.schema';

import { teachersToRoles } from 'src/drizzle/schema/teachers.schema';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
});

// roles relations
export const roleRelations = relations(roles, ({ many }) => ({
  teachersToRoles: many(teachersToRoles),
  rolesToPermissions: many(rolesToPermissions),
}));

// roles to permissions Join Table
export const rolesToPermissions = pgTable(
  'roles_to_permissions',
  {
    id: serial('id').primaryKey(),
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    permissionId: integer('permission_id')
      .notNull()
      .references(() => permissions.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    create: boolean('create').notNull().default(false),
    read: boolean('read').notNull().default(false),
    update: boolean('update').notNull().default(false),
    delete: boolean('delete').notNull().default(false),
  },
  (table) => ({
    rolePermissionUnique: unique().on(table.roleId, table.permissionId),
  }),
);

// roles to permissions Relations
export const rolesToPermissionsRelations = relations(
  rolesToPermissions,
  ({ one }) => ({
    roles: one(roles, {
      fields: [rolesToPermissions.roleId],
      references: [roles.id],
    }),
    permissions: one(permissions, {
      fields: [rolesToPermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);
