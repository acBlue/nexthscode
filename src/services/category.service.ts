import prisma from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import { CategoryDTO } from '@/types';

// 定义缓存的 Key，方便后续手动清除缓存 (Revalidate)
const CACHE_TAG_SECTIONS = 'home-sections';

/**
 * 获取首页展示用的分类列表 (带缓存)
 */
export const getHomeCategories = unstable_cache(
    async (): Promise<CategoryDTO[]> => {
        console.log('⚡️ 正在从数据库查询分类数据 (MISS CACHE)...');

        // 1. 从数据库查询所有大类，按 Code 排序
        // 注意：这里的 Code 是字符串 ("I", "II", "XVI")，排序可能需要特殊处理
        // 这里的 orderBy 只是简单的字符串排序，对于罗马数字可能不完美，
        // 但通常我们在写入数据库时会有一个 sortOrder 字段，或者在内存里重排。
        const sections = await prisma.section.findMany({
            orderBy: {
                code: 'asc',
            },
        });

        // 2. 转换为 DTO (Data Transfer Object)
        // 这一步是为了解耦：如果以后换成 API，只要返回的结构一样，组件就不用改
        return sections.map((sec) => ({
            id: sec.id,
            code: sec.code, // 罗马数字 I, II...
            name: sec.name,
        }));
    },
    [CACHE_TAG_SECTIONS], // 缓存 Key Parts
    {
        revalidate: 86400, // 缓存有效期：24小时 (秒)
        tags: [CACHE_TAG_SECTIONS], // 缓存标签，用于按需清除
    }
);


/**
 * 获取完整的分类树 (包含章节) - 用于分类浏览页
 */
export const getAllSectionsWithChapters = unstable_cache(
    async () => {
        const sections = await prisma.section.findMany({
            include: {
                chapters: {
                    orderBy: {
                        code: 'asc', // 章节按 01, 02... 排序
                    },
                },
            },
            // 这里如果想要大类按 I, II, III 排序，最好的办法是在数据库加个 sortOrder 字段
            // 目前我们先按创建时间或者名称排序，或者在前端重排
            orderBy: {
                code: 'asc',
            },
        });

        return sections;
    },
    ['all-sections-tree'],
    { revalidate: 86400 }
);