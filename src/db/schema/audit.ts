import { timestamp, uuid, type PgTableWithColumns } from 'drizzle-orm/pg-core';

// 基础时间戳（系统自动维护）
export const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

// 完整审计字段辅助函数 (含操作人外键，引用 users.id)
export function createAuditColumns(getUsersTable: () => PgTableWithColumns<any>) {
  return {
    ...timestamps,
    createdBy: uuid('created_by').references(() => getUsersTable().id, { onDelete: 'set null' }),
    updatedBy: uuid('updated_by').references(() => getUsersTable().id, { onDelete: 'set null' }),
  };
}
