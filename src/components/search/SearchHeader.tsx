"use client";

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface SearchHeaderProps {
    initialQuery: string;
    total: number;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    selectedCount?: number;
}

export default function SearchHeader({ 
    initialQuery, 
    total, 
    showFilters, 
    setShowFilters,
    selectedCount = 0
}: SearchHeaderProps) {
    const router = useRouter();
    const [query, setQuery] = useState(initialQuery);

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    const handleSearch = () => {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleClear = () => {
        setQuery("");
        router.push('/search');
    };

    return (
        <div className="bg-white/95 border-b border-slate-200/90 sticky top-16 z-30 shadow-2xs backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between gap-3 sm:gap-4">
                    
                    {/* 左侧：筛选器切换按钮 */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant={showFilters ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className={`rounded-xl h-10 px-3 transition-all flex items-center gap-2 ${
                                showFilters 
                                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xs" 
                                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                            title="切换分类筛选栏"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span className="hidden sm:inline text-xs font-semibold">
                                {showFilters ? "收起筛选" : "展开筛选"}
                            </span>
                            {selectedCount > 0 && (
                                <span className="ml-0.5 inline-flex items-center justify-center h-4.5 min-w-4.5 px-1 text-[10px] font-bold rounded-full bg-white text-blue-700">
                                    {selectedCount}
                                </span>
                            )}
                        </Button>
                    </div>

                    {/* 中间：大搜索框 */}
                    <div className="flex-1 max-w-2xl relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="输入 HS 编码 (如 8517) 或中文品名检索..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-10 pr-20 h-10.5 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white text-sm text-slate-800 placeholder:text-slate-400 shadow-2xs transition-all"
                        />
                        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {query && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
                                    title="清空搜索"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                            <Button 
                                size="sm" 
                                onClick={handleSearch}
                                className="h-7.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg shadow-2xs"
                            >
                                搜索
                            </Button>
                        </div>
                    </div>

                    {/* 右侧：结果统计与快速链接 */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                            <span className="text-xs text-slate-500">找到</span>
                            <span className="text-sm font-extrabold font-mono text-blue-600 mx-1.5">{total.toLocaleString()}</span>
                            <span className="text-xs text-slate-500">条商品编码</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
