import { db } from '@/lib/db';
import { hscodes, chapters } from '@/db/schema';
// 1. ✅ 核心修复：添加 sql 导入
import { like, or, and, ilike, eq, inArray, count, desc, asc, SQL, sql } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

export interface SearchParams {
    q?: string;
    page?: number;
    pageSize?: number;
    chapters?: string[];
}

// ==========================================
// 1. 搜索主逻辑
// ==========================================
export async function searchHsCodes({ q, page = 1, pageSize = 10, chapters: selectedChapters }: SearchParams) {
    const cleanQuery = q?.trim() || "";
    const offset = (page - 1) * pageSize;

    // 构造搜索条件
    const searchConditions: (SQL | undefined)[] = [];

    // A. 关键词搜索
    if (cleanQuery) {
        searchConditions.push(or(
            ilike(hscodes.code, `%${cleanQuery}%`),
            ilike(hscodes.cleanCode, `%${cleanQuery}%`),
            ilike(hscodes.name, `%${cleanQuery}%`),
        ));
    }

    // B. 章节筛选
    if (selectedChapters && selectedChapters.length > 0) {
        // 先查出章节 ID
        const chapterRecords = await db.query.chapters.findMany({
            where: inArray(chapters.code, selectedChapters),
            columns: { id: true }
        });
        const chapterIds = chapterRecords.map(c => c.id);

        if (chapterIds.length > 0) {
            searchConditions.push(inArray(hscodes.chapterId, chapterIds));
        } else {
            searchConditions.push(eq(hscodes.id, 'impossible-id'));
        }
    }

    const finalWhere = and(...searchConditions);

    // 2. 执行查询 (Results)
    const results = await db.query.hscodes.findMany({
        where: finalWhere,
        with: {
            chapter: true,
        },
        orderBy: [asc(hscodes.code)],
        limit: pageSize,
        offset: offset,
    });

    // 3. 执行统计 (Total Count)
    const totalRes = await db
        .select({ value: count() })
        .from(hscodes)
        .where(finalWhere);

    return {
        data: results,
        total: totalRes[0].value
    };
}

// ==========================================
// 2. ✅ 补全：章节聚合统计 (用于侧边栏筛选)
// ==========================================
export const getChapterFacets = async (query: string) => {
    const cleanQuery = query?.trim() || "";

    // 仅使用搜索关键词条件，不应用章节筛选，
    // 这样用户即使勾选了某一章，也能看到其他章有多少结果
    const searchCondition = cleanQuery
        ? or(
            ilike(hscodes.code, `%${cleanQuery}%`),
            ilike(hscodes.cleanCode, `%${cleanQuery}%`),
            ilike(hscodes.name, `%${cleanQuery}%`)
        )
        : undefined;

    // 聚合查询: Group By Chapter + Count
    const facets = await db
        .select({
            code: chapters.code,      // 章节代码 (85)
            name: chapters.name,      // 章节名称
            count: sql<number>`count(*)`, // 统计数量
        })
        .from(hscodes)
        .leftJoin(chapters, eq(hscodes.chapterId, chapters.id)) // 关联查询
        .where(searchCondition)
        .groupBy(chapters.code, chapters.name)
        .orderBy(asc(chapters.code)); // 按数量倒序

    // 格式化返回
    return facets.map(item => ({
        id: item.code || 'unknown',
        name: `第 ${item.code} 章 ${item.name || ''}`,
        count: Number(item.count),
    }));
};

// ==========================================
// 3. 详情页查询
// ==========================================
export const getHsCodeDetail = unstable_cache(
    async (cleanCode: string) => {
        const data = await db.query.hscodes.findFirst({
            where: eq(hscodes.cleanCode, cleanCode),
            with: {
                chapter: {
                    with: {
                        section: true,
                    },
                },
            },
        });
        return data;
    },
    ['hscode-detail-v3'],
    { revalidate: 604800 }
);