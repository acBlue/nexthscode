import { pgTable, serial, text, integer, jsonb, timestamp, index, uuid } from 'drizzle-orm/pg-core';
import { users } from './account';

export const REF_STATUS = {
  DISABLED: 0,
  ACTIVE: 1,
  DEPRECATED: 2,
} as const;

export const sysReferences = pgTable('sys_references', {
  id: serial('id').primaryKey(),
  category: text('category').notNull(),
  code: text('code').notNull(),
  name: text('name').notNull(),
  properties: jsonb('properties'),
  status: integer('status').default(1).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  updatedBy: uuid('updated_by').references(() => users.id, { onDelete: 'set null' }),
}, (table) => ({
  lookupIdx: index('idx_ref_lookup').on(table.category, table.code, table.status),
  searchIdx: index('idx_ref_search').on(table.category, table.name, table.status),
}));