"use client";

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchHeaderProps {
    initialQuery: string;
    total: number;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
}

export default function SearchHeader({ initialQuery, total, showFilters, setShowFilters }: SearchHeaderProps) {
    const router = useRouter();
    const [query, setQuery] = useState(initialQuery);

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
        <div className="bg-background border-b sticky top-16 z-30 shadow-sm supports-[backdrop-filter]:bg-background/60 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center gap-4">
                    
                    {/* 筛选切换按钮 */}
                    <Button
                        variant={showFilters ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setShowFilters(!showFilters)}
                        className={showFilters ? "text-blue-600 bg-blue-50 hover:bg-blue-100" : "text-muted-foreground"}
                        title="切换筛选栏"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                    </Button>

                    {/* 搜索框区域 */}
                    <div className="flex-grow max-w-2xl relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="在此输入关键词、HS编码..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-9 pr-12 bg-muted/50 focus:bg-background transition-all"
                        />
                        <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={handleSearch}
                            className="absolute right-1 top-1 h-8 w-8 p-0"
                        >
                            <Search className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* 结果统计 */}
                    <div className="flex items-center gap-3 ml-auto border-l pl-4">
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                            共 <span className="font-bold text-foreground">{total}</span> 条结果
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}