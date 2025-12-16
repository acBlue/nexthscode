"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchHeader from './SearchHeader';
import FilterSidebar, { FilterGroup } from './FilterSidebar';
import ResultCard from './ResultCard';
import Pagination from '@/components/Pagination';

interface SearchLayoutProps {
    initialQuery: string;
    total: number;
    results: any[];
    currentPage: number;
    selectedChapters: string[];
    // ✅ 必须包含这个 Prop
    chapterFacets: FilterGroup[];
}

export default function SearchLayout({
                                         initialQuery,
                                         total,
                                         results,
                                         currentPage,
                                         selectedChapters,
                                         chapterFacets // ✅ 接收
                                     }: SearchLayoutProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showFilters, setShowFilters] = useState(true);

    const handleToggleChapter = (code: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = new Set(selectedChapters);

        if (current.has(code)) {
            current.delete(code);
        } else {
            current.add(code);
        }

        if (current.size > 0) {
            params.set('chapter', Array.from(current).join(','));
        } else {
            params.delete('chapter');
        }
        params.set('page', '1');
        router.push(`/search?${params.toString()}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <SearchHeader
                initialQuery={initialQuery}
                total={total}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
            />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex gap-6 items-start">
                    <div className={showFilters ? 'block' : 'hidden'}>
                        <FilterSidebar
                            // ✅ 使用服务端传入的聚合数据
                            chapters={chapterFacets}
                            selectedChapters={selectedChapters}
                            onToggleChapter={handleToggleChapter}
                        />
                    </div>

                    <div className="flex-grow space-y-4">
                        {results.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                                <p className="text-gray-500 text-lg">没有找到相关结果</p>
                                <p className="text-sm text-gray-400 mt-2">请尝试简化关键词或清除筛选条件</p>
                                {selectedChapters.length > 0 && (
                                    <button
                                        onClick={() => router.push(`/search?q=${initialQuery}`)}
                                        className="mt-4 text-blue-600 hover:underline"
                                    >
                                        清除所有筛选
                                    </button>
                                )}
                            </div>
                        ) : (
                            results.map((item) => (
                                <ResultCard
                                    key={item.id}
                                    item={{
                                        id: item.id,
                                        cleanCode: item.cleanCode,
                                        code: item.code,
                                        name: item.name,
                                        unit1: item.unit1,
                                        unit2: item.unit2,
                                        regulatoryCode: item.regulatoryCode,
                                        quarantineCode: item.quarantineCode,
                                        mfnRate: item.mfnRate,
                                        vatRate: item.vatRate,
                                        exportRebateRate: item.exportRebateRate,
                                        generalRate: item.generalRate
                                    }}
                                />
                            ))
                        )}
                        <Pagination total={total} pageSize={10} currentPage={currentPage} />
                    </div>
                </div>
            </main>
        </div>
    );
}