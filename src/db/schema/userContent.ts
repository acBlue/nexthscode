import { pgTable, text, uuid, timestamp, uniqueIndex, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './account';
import { hscodes } from './hscode';

// 1. 用户收藏夹表 (User Favorites)
export const userFavorites = pgTable(
  'user_favorite',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    hscodeId: uuid('hscodeId')
      .notNull()
      .references(() => hscodes.id, { onDelete: 'cascade' }),
    note: text('note'), // 自定义备注，例如“客户A常用模组”、“自用物料”
    tags: text('tags'), // 自定义标签，逗号隔开
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => ({
    userHscodeIdx: uniqueIndex('user_favorite_user_hscode_idx').on(table.userId, table.hscodeId),
    userIdx: index('user_favorite_user_idx').on(table.userId),
  })
);

// 关系定义
export const userFavoritesRelations = relations(userFavorites, ({ one }) => ({
  user: one(users, {
    fields: [userFavorites.userId],
    references: [users.id],
  }),
  hscode: one(hscodes, {
    fields: [userFavorites.hscodeId],
    references: [hscodes.id],
  }),
}));
