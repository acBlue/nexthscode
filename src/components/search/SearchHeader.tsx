"use client";

import React, { useState, useEffect } from 'react'; // 1. 引入 useEffect
import { Search, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchHeaderProps {
    initialQuery: string;
    total: number;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
}

export default function SearchHeader({ initialQuery, total, showFilters, setShowFilters }: SearchHeaderProps) {
    const router = useRouter();
    const [query, setQuery] = useState(initialQuery);

    // 2. 新增：当 URL 带来的 initialQuery 变化时，同步更新输入框
    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    const handleSearch = () => {
        if (!query.trim()) return;
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center gap-4">

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="切换筛选栏"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                    </button>

                    <div className="flex-grow max-w-2xl relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full pl-10 pr-12 py-2 bg-gray-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-md text-sm transition-all outline-none"
                            placeholder="在此输入关键词、HS编码..."
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-1.5 bg-white p-1 rounded hover:bg-gray-200 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 ml-auto border-l border-gray-200 pl-4">
                        <span className="text-xs text-gray-500 hidden sm:inline">共 <span className="font-bold text-gray-900">{total}</span> 条结果</span>
                    </div>
                </div>
            </div>
        </div>
    );
}