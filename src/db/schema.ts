import { pgTable, text, uuid, timestamp, jsonb, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. 大类表 (Section)
export const sections = pgTable('Section', {
    id: uuid('id').defaultRandom().primaryKey(),
    code: text('code').notNull().unique(), // I, II, XVI
    name: text('name').notNull(),
});

// 定义 Section 的关联关系
export const sectionsRelations = relations(sections, ({ many }) => ({
    chapters: many(chapters),
}));

// 2. 章节表 (Chapter)
export const chapters = pgTable('Chapter', {
    id: uuid('id').defaultRandom().primaryKey(),
    code: text('code').notNull().unique(), // 85
    name: text('name').notNull(),
    desc: text('desc'),
    sectionId: text('sectionId').notNull().references(() => sections.id), // 外键
});

// 定义 Chapter 的关联关系
export const chaptersRelations = relations(chapters, ({ one, many }) => ({
    section: one(sections, {
        fields: [chapters.sectionId],
        references: [sections.id],
    }),
    hscodes: many(hscodes),
}));

// 3. 海关编码表 (HsCode)
export const hscodes = pgTable('HsCode', {
    id: uuid('id').defaultRandom().primaryKey(),
    code: text('code').notNull().unique(),      // 8542.31.00.00
    cleanCode: text('cleanCode').notNull().unique(), // 8542310000
    name: text('name').notNull(),
    nameEn: text('nameEn'),
    description: text('description'),
    unit: text('unit'),

    // 基础税率
    mfnRate: text('mfnRate'),
    generalRate: text('generalRate'),
    vatRate: text('vatRate'),
    exportRate: text('exportRate'), // Prisma里叫 exportRate

    // JSON 数据 (Postgres 强项)
    agreements: jsonb('agreements'),
    elements: jsonb('elements'),
    supervision: jsonb('supervision'),
    inspection: jsonb('inspection'),

    chapterId: text('chapterId').notNull().references(() => chapters.id),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
}, (table) => {
    return {
        // 索引定义
        cleanCodeIdx: index('HsCode_cleanCode_idx').on(table.cleanCode),
        nameIdx: index('HsCode_name_idx').on(table.name),
    };
});

// 定义 HsCode 的关联关系
export const hscodesRelations = relations(hscodes, ({ one }) => ({
    chapter: one(chapters, {
        fields: [hscodes.chapterId],
        references: [chapters.id],
    }),
}));