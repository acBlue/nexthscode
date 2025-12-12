import { db } from '@/lib/db';
import { hscodes, chapters } from '@/db/schema';
import { like, or, and, ilike, eq, inArray, count, desc, asc, SQL } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

export interface SearchParams {
    q?: string;
    page?: number;
    pageSize?: number;
    chapters?: string[]; // 接收章节 Code 数组 (e.g. ['85', '90'])
}

export async function searchHsCodes({ q, page = 1, pageSize = 10, chapters: selectedChapters }: SearchParams) {
    const cleanQuery = q?.trim() || "";
    const offset = (page - 1) * pageSize;

    // 1. 动态构造 Where 条件数组
    const conditions: (SQL | undefined)[] = [];

    // A. 关键词模糊搜索 (如果有)
    if (cleanQuery) {
        conditions.push(or(
            ilike(hscodes.code, `%${cleanQuery}%`),       // 搜编码
            ilike(hscodes.cleanCode, `%${cleanQuery}%`),  // 搜纯数字
            ilike(hscodes.name, `%${cleanQuery}%`),       // 搜中文名
            ilike(hscodes.nameEn, `%${cleanQuery}%`)      // 搜英文名
        ));
    }

    // B. 章节筛选 (如果有)
    // Drizzle 的关联筛选比较特别。 hscodes 表里只有 chapterId，但前端传的是 chapterCode (如 '85')。
    // 严谨的做法是先查出 IDs，或者用子查询。
    // 但为了性能，最好的设计是：hscodes 表里冗余存储一个 chapterCode 字段，或者我们在内存里处理。
    // 这里我们使用子查询 (Subquery) 的思路，或者假设我们已经获取了 chapterId。

    // 👉 方案优化：为了让逻辑跑通，我们这里先用一个简单的假设：
    // 如果你需要精确筛选章节，我们可以在 hscodes 表里 join chapters 表进行筛选。
    // 但 db.query API 做 filter relation 比较麻烦。
    // 最简单的方案：先根据 selectedChapters (codes) 查出对应的 UUIDs
    if (selectedChapters && selectedChapters.length > 0) {
        // 1. 先查出 '85', '90' 对应的数据库 UUID
        const chapterRecords = await db.query.chapters.findMany({
            where: inArray(chapters.code, selectedChapters),
            columns: { id: true }
        });

        const chapterIds = chapterRecords.map(c => c.id);

        // 2. 如果查到了 ID，就加到筛选条件里
        if (chapterIds.length > 0) {
            conditions.push(inArray(hscodes.chapterId, chapterIds));
        } else {
            // 选了章节但数据库没查到 ID？那应该返回空结果
            // 这里推入一个永远为假的条件，或者直接返回空
            conditions.push(eq(hscodes.id, 'impossible-id'));
        }
    }


    // 2. 执行查询 (Results)
    const results = await db.query.hscodes.findMany({
        where: and(...conditions), // 使用 and 把所有条件连起来
        with: {
            chapter: true, // 关联章节信息
        },
        orderBy: [asc(hscodes.code)], // 按编码排序
        limit: pageSize,
        offset: offset,
    });

    // 3. 执行统计 (Total Count)
    // Drizzle 需要用 select({ value: count() }) 来统计
    const totalRes = await db
        .select({ value: count() })
        .from(hscodes)
        // 注意：这里如果涉及关联表的筛选 (比如章节)，纯 select 需要手动 leftJoin
        // 如果上面的 conditions 里只有 hscodes 本表的字段，可以直接用
        // 如果有 chapterId 的筛选，也是本表字段，可以直接用。
        .where(and(...conditions));

    return {
        data: results,
        total: totalRes[0].value
    };
}

// 详情页 Service (保持不变，确认一下语法即可)
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
    ['hscode-detail-drizzle'],
    { revalidate: 604800 }
);