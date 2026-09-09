"use client";

import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter, RotateCcw } from "lucide-react";
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
            <div className="sticky top-36 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                
                {/* 侧边栏头部 */}
                <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-blue-600" />
                        <h3 className="text-sm font-bold text-slate-800">章节筛选</h3>
                    </div>
                    {selectedChapters.length > 0 && (
                        <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                            已选 {selectedChapters.length}
                        </span>
                    )}
                </div>

                {/* 章节内过滤输入框 */}
                {chapters.length > 5 && (
                    <div className="p-3 border-b border-slate-100">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <Input
                                placeholder="过滤章号或名称..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="pl-8 h-8 text-xs bg-slate-50 border-slate-200 rounded-lg focus:bg-white"
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
                                                    ? 'bg-blue-50/80 text-blue-900 font-medium'
                                                    : 'hover:bg-slate-50 text-slate-700'
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
                                                    <span className="font-mono font-bold text-slate-900 text-[11px]">
                                                        第 {chapter.id} 章
                                                    </span>
                                                    <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded-full">
                                                        {chapter.count}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
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
