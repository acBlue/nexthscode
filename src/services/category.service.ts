import { db } from '@/lib/db';
import { sections, chapters, hscodes } from '@/db/schema';
import { unstable_cache } from 'next/cache';
import { sql, asc } from 'drizzle-orm';

// 定义返回的数据类型
export type SectionWithChapters = {
    id: string;
    code: string;
    name: string;
    chapters: {
        id: string;
        code: string;
        name: string;
        desc: string | null; // ✅ 修复：允许 desc 为 null，防止类型报错
        count: number;
    }[];
};

export const getAllSectionsWithChapters = unstable_cache(
    async (): Promise<SectionWithChapters[]> => {
        // 1. 获取基础结构 (Section -> Chapters)
        const sectionsData = await db.query.sections.findMany({
            with: {
                chapters: {
                    orderBy: [asc(chapters.code)],
                },
            },
            orderBy: [asc(sections.code)],
        });

        // 2. 聚合查询：计算每个章节下的 HSCode 数量
        // 使用 cast(count(*) as integer) 确保 Postgres 返回数字类型
        const counts = await db
            .select({
                chapterId: hscodes.chapterId,
                count: sql<number>`cast(count(*) as integer)`.mapWith(Number).as('total_count'),
            })
            .from(hscodes)
            .groupBy(hscodes.chapterId);

        // 3. 将计数转换为 Map，方便快速查找
        // Map<chapterId, count>
        const countMap = new Map<string, number>();
        counts.forEach((row) => {
            if (row.chapterId) {
                // 统一转小写，确保 UUID 匹配万无一失
                countMap.set(row.chapterId.toLowerCase(), row.count);
            }
        });

        // 4. 将计数合并回结构中
        const result = sectionsData.map((section) => ({
            ...section,
            chapters: section.chapters.map((chapter) => ({
                ...chapter,
                // 从 Map 获取，没有则为 0
                count: countMap.get(chapter.id.toLowerCase()) || 0,
            })),
        }));

        return result;
    },
    ['all-sections-tree-final-v1'], // ✨ 更新 Key，确保生产环境也能刷新
    { revalidate: 86400 }
);

// 首页的大类列表
export const getHomeCategories = unstable_cache(
    async () => {
        const result = await db.query.sections.findMany({
            orderBy: [asc(sections.code)],
        });
        return result.map((r) => ({ id: r.id, code: r.code, name: r.name }));
    },
    ['home-sections-drizzle'],
    { revalidate: 86400 }
);