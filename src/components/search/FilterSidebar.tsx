"use client";

import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface FilterGroup {
    id: string;
    name: string;
    count: number;
}

interface FilterSidebarProps {
    chapters: FilterGroup[];
    selectedChapters: string[];
    onToggleChapter: (code: string) => void;
}

export default function FilterSidebar({ chapters, selectedChapters, onToggleChapter }: FilterSidebarProps) {
    const [filterText, setFilterText] = useState("");

    const filteredChapters = chapters.filter(c => 
        c.name.toLowerCase().includes(filterText.toLowerCase()) || 
        c.id.includes(filterText)
    );

    return (
        <aside className="w-72 flex-shrink-0 hidden md:block">
            <div className="sticky top-36 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs overflow-hidden transition-colors duration-200">
                
                {/* 侧边栏头部 */}
                <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">章节筛选</h3>
                    </div>
                    {selectedChapters.length > 0 && (
                        <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-500/20 px-2 py-0.5 rounded-full">
                            已选 {selectedChapters.length}
                        </span>
                    )}
                </div>

                {/* 章节内过滤输入框 */}
                {chapters.length > 5 && (
                    <div className="p-3 border-b border-slate-100 dark:border-white/[0.06]">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <Input
                                placeholder="过滤章号或名称..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="pl-8 h-8 text-xs bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-white/[0.08] rounded-lg focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-slate-200"
                            />
                        </div>
                    </div>
                )}

                <div className="p-2">
                    {filteredChapters.length === 0 ? (
                        <div className="py-8 text-center text-xs text-slate-400">
                            未匹配到相关章节
                        </div>
                    ) : (
                        <ScrollArea className="h-[calc(100vh-320px)] pr-2">
                            <div className="space-y-1 p-1">
                                {filteredChapters.map((chapter) => {
                                    const isChecked = selectedChapters.includes(chapter.id);
                                    return (
                                        <label
                                            key={chapter.id}
                                            htmlFor={`chapter-${chapter.id}`}
                                            className={`flex items-start gap-2.5 p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                                                isChecked
                                                    ? 'bg-blue-50/80 dark:bg-blue-500/15 text-blue-900 dark:text-blue-300 font-medium'
                                                    : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                                            }`}
                                        >
                                            <Checkbox
                                                id={`chapter-${chapter.id}`}
                                                checked={isChecked}
                                                onCheckedChange={() => onToggleChapter(chapter.id)}
                                                className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-sm"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-1 mb-0.5">
                                                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-[11px]">
                                                        第 {chapter.id} 章
                                                    </span>
                                                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded-full">
                                                        {chapter.count}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                                                    {chapter.name}
                                                </p>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    )}
                </div>

            </div>
        </aside>
    );
}
