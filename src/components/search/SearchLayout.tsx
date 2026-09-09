"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchHeader from './SearchHeader';
import FilterSidebar, { FilterGroup } from './FilterSidebar';
import ResultCard from './ResultCard';
import Pagination from '@/components/Pagination';
import { SearchX, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchLayoutProps {
    initialQuery: string;
    total: number;
    results: any[];
    currentPage: number;
    selectedChapters: string[];
    chapterFacets: FilterGroup[];
}

export default function SearchLayout({
    initialQuery,
    total,
    results,
    currentPage,
    selectedChapters,
    chapterFacets
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

    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('chapter');
        params.set('page', '1');
        router.push(`/search?${params.toString()}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/60 font-sans">
            <SearchHeader
                initialQuery={initialQuery}
                total={total}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                selectedCount={selectedChapters.length}
            />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                
                {/* 活跃过滤指示条 */}
                {selectedChapters.length > 0 && (
                    <div className="mb-6 p-3 bg-white rounded-xl border border-blue-100 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-slate-500 font-medium">当前已筛选章节:</span>
                            {selectedChapters.map(chap => (
                                <span 
                                    key={chap} 
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-mono font-semibold border border-blue-200/60"
                                >
                                    第 {chap} 章
                                    <button 
                                        onClick={() => handleToggleChapter(chap)}
                                        className="hover:text-blue-950 font-bold ml-0.5"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>

                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleClearFilters}
                            className="text-xs text-slate-500 hover:text-red-600 h-7"
                        >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            重置全部筛选
                        </Button>
                    </div>
                )}

                <div className="flex gap-8 items-start">
                    {/* 左侧侧边栏 */}
                    <div className={showFilters ? 'block shrink-0' : 'hidden'}>
                        <FilterSidebar
                            chapters={chapterFacets}
                            selectedChapters={selectedChapters}
                            onToggleChapter={handleToggleChapter}
                        />
                    </div>

                    {/* 右侧列表区域 */}
                    <div className="flex-grow space-y-4 min-w-0">
                        {results.length === 0 ? (
                            <div className="text-center py-20 px-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs max-w-2xl mx-auto">
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                                    <SearchX className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">未找到符合条件的商品编码</h3>
                                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                                    {initialQuery 
                                        ? `没有找到与关键词 “${initialQuery}” 匹配的海关编码。请尝试精简关键词或检查拼写。` 
                                        : "请在上方搜索框输入 HS 编码或商品通用名称。"}
                                </p>

                                <div className="mt-6 flex flex-wrap justify-center gap-2">
                                    {selectedChapters.length > 0 && (
                                        <Button 
                                            variant="outline" 
                                            onClick={handleClearFilters}
                                            className="rounded-xl border-slate-200"
                                        >
                                            清除所有章节筛选
                                        </Button>
                                    )}
                                    <Button 
                                        className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                                        onClick={() => router.push('/category')}
                                    >
                                        去全部分类大纲浏览
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {results.map((item) => (
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
                                            generalRate: item.generalRate,
                                            tempRate: item.tempRate,
                                            consumptionRate: item.consumptionRate
                                        }}
                                    />
                                ))}

                                <div className="pt-6">
                                    <Pagination total={total} pageSize={10} currentPage={currentPage} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
