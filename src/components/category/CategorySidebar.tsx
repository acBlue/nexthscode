import React from 'react';
import { Layers, ChevronRight } from 'lucide-react';

// 定义分类的数据结构
interface SectionItem {
    id: string;
    roman: string; // 罗马数字 (I, II...)
    name: string;
}

interface SidebarProps {
    sections: SectionItem[];
    activeId: string;
    onSelect: (id: string) => void;
}

export default function CategorySidebar({ sections, activeId, onSelect }: SidebarProps) {
    return (
        <aside className="w-full md:w-72 flex-shrink-0 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-fit">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    海关编码大类
                </h2>
            </div>

            {/* 列表区域：设置最大高度和滚动，防止页面过长 */}
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                <ul className="divide-y divide-gray-50">
                    {sections.map((section) => {
                        const isActive = activeId === section.id;
                        return (
                            <li key={section.id}>
                                <button
                                    onClick={() => onSelect(section.id)}
                                    className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-all hover:bg-gray-50 ${
                                        isActive
                                            ? 'bg-blue-50/60 border-l-4 border-blue-600'
                                            : 'border-l-4 border-transparent'
                                    }`}
                                >
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${
                      isActive
                          ? 'bg-blue-100 text-blue-700 border-blue-200'
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                  }`}>
                    {section.roman}
                  </span>
                                    <span className={`text-sm font-medium line-clamp-2 ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
                    {section.name}
                  </span>
                                    {isActive && <ChevronRight className="w-4 h-4 text-blue-500 ml-auto mt-0.5" />}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}