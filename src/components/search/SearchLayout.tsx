"use client";

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // 引入路由
import SearchHeader from './SearchHeader';
import FilterSidebar, { FilterGroup } from './FilterSidebar';
import ResultCard from './ResultCard';
import Pagination from '@/components/Pagination'; // 引入分页组件

interface SearchLayoutProps {
    initialQuery: string;
    total: number;
    results: any[];
    currentPage: number; // 接收当前页码
    selectedChapters: string[]; // 接收选中的章节
}

export default function SearchLayout({
                                         initialQuery,
                                         total,
                                         results,
                                         currentPage,
                                         selectedChapters
                                     }: SearchLayoutProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showFilters, setShowFilters] = useState(true);

    // 1. 客户端统计章节数量
    // 注意：这里的统计仅基于当前页数据 (Results)。
    // 如果想统计全库，需要后端单独返回聚合数据 (Facets)。
    // 为了简单，我们暂时只展示当前结果中出现的章节。
    const chapterFilters = useMemo(() => {
        const map = new Map<string, FilterGroup>();
        results.forEach((item) => {
            if (item.chapter) {
                const id = item.chapter.code;
                const name = `第 ${item.chapter.code} 章 ${item.chapter.name}`;
                if (map.has(id)) {
                    map.get(id)!.count++;
                } else {
                    map.set(id, { id, name, count: 1 });
                }
            }
        });
        // 如果当前选中的章节在结果里没出现，我们也应该把它加进去，哪怕 count 是 0 (防止用户取消勾选时找不到)
        // 这里为了 UI 简洁暂时不处理 "count: 0" 的情况
        return Array.from(map.values()).sort((a, b) => b.count - a.count);
    }, [results]);

    // 2. 处理筛选逻辑：点击复选框 -> 修改 URL
    const handleToggleChapter = (code: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // 获取当前的章节列表
        const current = new Set(selectedChapters);

        if (current.has(code)) {
            current.delete(code); // 取消勾选
        } else {
            current.add(code);    // 勾选
        }

        // 更新 URL 参数 (chapters=85,90)
        if (current.size > 0) {
            params.set('chapter', Array.from(current).join(','));
        } else {
            params.delete('chapter');
        }

        // 筛选变了，页码重置回 1
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
                            chapters={chapterFilters}
                            selectedChapters={selectedChapters} // 传入选中状态
                            onToggleChapter={handleToggleChapter} // 传入回调
                        />
                    </div>

                    <div className="flex-grow space-y-4">
                        {/* 结果列表 */}
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
                                                // 3. 关键修复：不要再手写嵌套对象了，直接映射扁平字段
                                                item={{
                                                    id: item.id,
                                                    cleanCode: item.cleanCode, // 必须传，否则跳转失效
                                                    code: item.code,
                                                    name: item.name,
                                                    
                                                    // 直接取数据库的新字段
                                                    unit1: item.unit1, 
                                                    unit2: item.unit2,
                                                    regulatoryCode: item.regulatoryCode,
                                                    mfnRate: item.mfnRate,
                                                    vatRate: item.vatRate,
                                                    exportRebateRate: item.exportRebateRate
                                                }} 
                                                />
                            ))
                        )}

                        {/* 3. 底部插入分页组件 */}
                        <Pagination
                            total={total}
                            pageSize={10}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}