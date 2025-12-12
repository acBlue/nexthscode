import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';

// 注意：Drizzle 的 API 和 Prisma 有点像，但使用的是 'db.query' 风格
export const getAllSectionsWithChapters = unstable_cache(
    async () => {
        const sections = await db.query.sections.findMany({
            with: {
                chapters: {
                    orderBy: (chapters, { asc }) => [asc(chapters.code)],
                },
            },
            // Drizzle 目前 orderBy 稍微复杂点，或者我们在内存排序
        });

        // 简单的内存排序 (如果数据库取出来乱序的话)
        // 也可以在 query 里加 orderBy: (sections, { asc }) => [asc(sections.code)]
        return sections;
    },
    ['all-sections-tree-drizzle'],
    { revalidate: 86400 }
);

export const getHomeCategories = unstable_cache(
    async () => {
        // 只查大类
        const result = await db.query.sections.findMany({
            orderBy: (sections, { asc }) => [asc(sections.code)]
        });
        return result.map(r => ({ id: r.id, code: r.code, name: r.name }));
    },
    ['home-sections-drizzle'],
    { revalidate: 86400 }
);