import  prisma  from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';

export interface SearchParams {
    q?: string;
    page?: number;
    pageSize?: number;
    chapters?: string[]; // 1. 新增：接收章节数组
}

export async function searchHsCodes({ q, page = 1, pageSize = 10, chapters }: SearchParams) {
    const skip = (page - 1) * pageSize;
    const cleanQuery = q?.trim() || "";

    // 2. 构造基础查询条件
    const where: Prisma.HsCodeWhereInput = {};

    // 处理关键词搜索
    if (cleanQuery) {
        where.OR = [
            { code: { contains: cleanQuery } },
            { cleanCode: { contains: cleanQuery } },
            { name: { contains: cleanQuery } },
            { nameEn: { contains: cleanQuery, mode: 'insensitive' } },
        ];
    }

    // 3. 处理章节筛选 (新增逻辑)
    // 如果传入了章节数组，且数组不为空，则追加 AND 条件
    if (chapters && chapters.length > 0) {
        where.AND = [
            {
                chapter: {
                    code: { in: chapters } // 筛选 chapter.code 在数组内的
                }
            }
        ];
    }

    const [data, total] = await prisma.$transaction([
        prisma.hsCode.findMany({
            where,
            skip,
            take: pageSize,
            orderBy: { code: 'asc' },
            include: { chapter: true }
        }),
        prisma.hsCode.count({ where }),
    ]);

    return { data, total };
}


/**
 * 获取 HS 编码详情 (带长效缓存)
 * 缓存策略: 7天 (604800秒)
 */
export const getHsCodeDetail = unstable_cache(
    async (cleanCode: string) => {
        // 1. 查询数据库
        const data = await prisma.hsCode.findUnique({
            where: { cleanCode }, // 使用纯数字编码查询，URL 更美观
            include: {
                chapter: {
                    include: {
                        section: true, // 级联查询：编码 -> 章 -> 类
                    },
                },
            },
        });

        return data;
    },
    ['hscode-detail'], // Cache Key 前缀
    {
        revalidate: 604800, // 7 天重新验证一次
    }
);