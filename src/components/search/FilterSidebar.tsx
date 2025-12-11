"use client";

import React from 'react';

export interface FilterGroup {
    id: string; // 章节 Code (如 "85")
    name: string;
    count: number;
}

interface FilterSidebarProps {
    chapters: FilterGroup[];
    selectedChapters: string[]; // 接收当前选中的章节
    onToggleChapter: (code: string) => void; // 回调函数
}

export default function FilterSidebar({ chapters, selectedChapters, onToggleChapter }: FilterSidebarProps) {
    return (
        <aside className="w-64 flex-shrink-0 hidden md:block">
            <div className="sticky top-36 space-y-6 pr-2">

                <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">相关章节</h3>

                    {chapters.length === 0 ? (
                        <p className="text-xs text-gray-400">当前结果暂无分类信息</p>
                    ) : (
                        // 1. 修改样式：移除 max-h-60，改为 max-h-[70vh] 或者直接不限高
                        // 这里我用 max-h-[calc(100vh-200px)] 让它自适应屏幕高度，避免双重滚动条
                        <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar pr-2">
                            {chapters.map((chapter) => {
                                const isChecked = selectedChapters.includes(chapter.id);
                                return (
                                    <label key={chapter.id} className="flex items-center gap-2 group cursor-pointer hover:bg-gray-50 p-1 rounded-md -ml-1 transition-colors">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                className="peer w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                                // 2. 绑定选中状态和事件
                                                checked={isChecked}
                                                onChange={() => onToggleChapter(chapter.id)}
                                            />
                                        </div>
                                        <span className={`text-sm truncate flex-grow ${isChecked ? 'text-blue-700 font-medium' : 'text-gray-600'}`} title={chapter.name}>
                      {chapter.name}
                    </span>
                                        <span className="text-xs text-gray-400 bg-gray-100 px-1.5 rounded-full">
                      {chapter.count}
                    </span>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* 监管条件 (静态展示) */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">监管条件</h3>
                    <div className="flex flex-wrap gap-2">
                        {['3C认证', '进口许可证', '自动进口许可'].map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600 cursor-pointer hover:border-blue-400 hover:text-blue-600 transition-colors">
                 {tag}
               </span>
                        ))}
                    </div>
                </div>

            </div>
        </aside>
    );
}