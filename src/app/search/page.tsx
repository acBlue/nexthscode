import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchLayout from '@/components/search/SearchLayout';
import { searchHsCodes } from '@/services/hscode.service';

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        page?: string;
        chapter?: string; // 接收 chapter 参数 (例如 "85,90")
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;

    const query = params.q || "";
    const page = Number(params.page) || 1;
    const pageSize = 10;

    // 1. 解析章节参数: "85,90" -> ["85", "90"]
    const chapterParam = params.chapter;
    const selectedChapters = chapterParam ? chapterParam.split(',').filter(Boolean) : [];

    // 2. 调用 Service (传入 chapters)
    const { data: results, total } = await searchHsCodes({
        q: query,
        page,
        pageSize,
        chapters: selectedChapters
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <SearchLayout
                initialQuery={query}
                total={total}
                results={results}
                currentPage={page} // 传递页码
                selectedChapters={selectedChapters} // 传递选中的章节
            />

            <Footer />
        </div>
    );
}