"use client";

import React, { useState } from 'react';
import { Layers, ChevronRight, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SectionItem {
    id: string;
    roman: string;
    name: string;
}

interface SidebarProps {
    sections: SectionItem[];
    activeId: string;
    onSelect: (id: string) => void;
}

export default function CategorySidebar({ sections, activeId, onSelect }: SidebarProps) {
    const [search, setSearch] = useState("");

    const filtered = sections.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) || 
        s.roman.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <aside className="w-full md:w-80 flex-shrink-0 bg-white dark:bg-[#0f172a] border border-slate-200/90 dark:border-white/[0.08] rounded-2xl shadow-xs overflow-hidden transition-colors duration-200">
            <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/70 dark:bg-slate-900/60 space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                        <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        海关商品大类
                    </h2>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-full font-semibold">
                        共 {sections.length} 类
                    </span>
                </div>

                {/* 搜索框 */}
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <Input
                        placeholder="查找大类 (如 机械、车辆)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 h-8 text-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* 大类列表 */}
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar p-2">
                <ul className="space-y-1">
                    {filtered.length === 0 ? (
                        <li className="py-6 text-center text-xs text-slate-400">无匹配大类</li>
                    ) : (
                        filtered.map((section) => {
                            const isActive = activeId === section.id;
                            return (
                                <li key={section.id}>
                                    <button
                                        type="button"
                                        onClick={() => onSelect(section.id)}
                                        className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-blue-50/90 dark:bg-blue-500/15 text-blue-900 dark:text-blue-200 ring-1 ring-blue-200 dark:ring-blue-500/30 shadow-2xs font-semibold'
                                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 font-normal'
                                        }`}
                                    >
                                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border shrink-0 transition-colors ${
                                            isActive
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/[0.08]'
                                        }`}>
                                            {section.roman}
                                        </span>
                                        <span className={`text-xs leading-relaxed line-clamp-2 flex-1 ${
                                            isActive ? 'text-blue-950 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-300'
                                        }`}>
                                            {section.name}
                                        </span>
                                        {isActive && (
                                            <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                        )}
                                    </button>
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>
        </aside>
    );
}
