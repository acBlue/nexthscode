import { pgTable, text, uuid, timestamp, jsonb, index, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './account';

// 1. 大类表 (Section)
export const sections = pgTable('section', {
    id: uuid('id').defaultRandom().primaryKey(),
    code: text('code').notNull().unique(), // I, II, XVI
    name: text('name').notNull(),
    desc: text('desc'),
    sortOrder: integer('sort_order').default(0).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
    updatedBy: uuid('updated_by').references(() => users.id, { onDelete: 'set null' }),
});

// 定义 Section 的关联关系
export const sectionsRelations = relations(sections, ({ many }) => ({
    chapters: many(chapters),
}));

// 2. 章节表 (Chapter)
export const chapters = pgTable('chapter', {
    id: uuid('id').defaultRandom().primaryKey(),
    code: text('code').notNull().unique(), // 85
    name: text('name').notNull(),
    desc: text('desc'),
    sortOrder: integer('sort_order').default(0).notNull(),
    sectionId: uuid('sectionId').notNull().references(() => sections.id),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
    updatedBy: uuid('updated_by').references(() => users.id, { onDelete: 'set null' }),
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
export const hscodes = pgTable('hscode', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // --- 核心识别码 ---
  // 导入时需处理：0101210010 -> 0101.21.00.10
  code: text('code').notNull().unique(),      
  // 导入时需处理：0101210010 (纯数字，用于搜索和 URL)
  cleanCode: text('cleanCode').notNull().unique(), 

  // --- 基础信息 ---
  name: text('name').notNull(),          // product_name
  description: text('description'),      // remarks
  
  // --- 状态标识 (1: 有效启用, 0: 已废弃/失效) ---
  status: integer('status').default(1).notNull(),

  // --- 计量单位 (拆分) ---
  unit1: text('unit1'),                  // unit_1
  unit2: text('unit2'),                  // unit_2

  // --- 监管与检疫 ---
  regulatoryCode: text('regulatoryCode'), // regulatory_code
  quarantineCode: text('quarantineCode'), // quarantine_code

  // --- 进口税率 ---
  mfnRate: text('mfnRate'),              // import_mfn_tax (最惠国)
  generalRate: text('generalRate'),      // import_general_tax (普通)
  tempRate: text('tempRate'),            // import_temp_tax (暂定) [新]
  consumptionRate: text('consumptionRate'), // consumption_tax (消费税) [新]
  vatRate: text('vatRate'),              // vat_tax (增值税)
  
  // --- 出口税率 ---
  exportTaxRate: text('exportTaxRate'),        // export_tax (出口税) [新]
  exportRebateRate: text('exportRebateRate'),  // export_rebate_tax (退税)
  exportTempRate: text('exportTempRate'),      // export_temp_tax (出口暂定) [新]
  
  // --- 其他 ---
  usTariffRate: text('usTariffRate'),    // us_tariff (对美) [新]

  // --- 复杂数据 (Postgres JSONB) ---
  // declaration_elements -> elements
  elements: jsonb('elements'), 
  
  // 预留字段
  agreements: jsonb('agreements'), 
  supervision: jsonb('supervision'), // 如果未来想存监管条件的详细解释
  inspection: jsonb('inspection'),   // 如果未来想存检疫的详细解释

  // --- 关联 ---
  chapterId: uuid('chapterId').notNull().references(() => chapters.id),
  
  // --- 审计跟踪 ---
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  updatedBy: uuid('updated_by').references(() => users.id, { onDelete: 'set null' }),
}, (table) => {
  return {
    cleanCodeIdx: index('hscode_clean_code_idx').on(table.cleanCode),
    nameIdx: index('hscode_name_idx').on(table.name),
    statusIdx: index('hscode_status_idx').on(table.status),
  };
});

// 定义 HsCode 的关联关系
export const hscodesRelations = relations(hscodes, ({ one }) => ({
    chapter: one(chapters, {
        fields: [hscodes.chapterId],
        references: [chapters.id],
    }),
}));