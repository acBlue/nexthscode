import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchLayout from '@/components/search/SearchLayout';
import SearchSkeleton from '@/components/search/SearchSkeleton';
// 1. ✅ 修复导入 (去掉 .ts) 并引入 getChapterFacets
import { searchHsCodes, getChapterFacets } from '@/services/hscode.service';

export const runtime = 'edge';

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        page?: string;
        chapter?: string;
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.q || "";
    const page = Number(params.page) || 1;
    const pageSize = 10;
    const chapterParam = params.chapter;
    const selectedChapters = chapterParam ? chapterParam.split(',').filter(Boolean) : [];

    // 2. ✅ 并行执行：数据查询 + 聚合统计
    const [searchResults, facets] = await Promise.all([
        searchHsCodes({
            q: query,
            page,
            pageSize,
            chapters: selectedChapters
        }),
        getChapterFacets(query) // 聚合统计不传 selectedChapters，看全局
    ]);

    const { data: results, total } = searchResults;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <Suspense fallback={<div className="container py-8"><SearchSkeleton /></div>}>
                <SearchLayout
                    initialQuery={query}
                    total={total}
                    results={results}
                    currentPage={page}
                    selectedChapters={selectedChapters}
                    // 3. ✅ 传入聚合数据
                    chapterFacets={facets}
                />
            </Suspense>

            <Footer />
        </div>
    );
}