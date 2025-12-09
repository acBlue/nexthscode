import React from 'react';
import { Search, ChevronRight, SlidersHorizontal, Download, ChevronDown } from 'lucide-react';

interface SearchHeaderProps {
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
}

export default function SearchHeader({ showFilters, setShowFilters }: SearchHeaderProps) {
    return (
        <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center gap-4">

                    {/* 左侧：控制侧边栏显隐 */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="切换筛选栏"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                    </button>

                    {/* 中间：宽大的搜索条 */}
                    <div className="flex-grow max-w-2xl relative">
                        <input
                            type="text"
                            defaultValue="集成电路"
                            className="w-full pl-10 pr-12 py-2 bg-gray-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-md text-sm transition-all outline-none"
                            placeholder="在此输入关键词、HS编码..."
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                        <button className="absolute right-2 top-1.5 bg-white p-1 rounded hover:bg-gray-200 transition-colors">
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>

                    {/* 右侧：工具按钮 */}
                    <div className="flex items-center gap-3 ml-auto border-l border-gray-200 pl-4">
                        <span className="text-xs text-gray-500 hidden sm:inline">共 1,204 条结果</span>
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">
                            <Download className="w-4 h-4" /> 导出
                        </button>
                        <div className="relative">
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">
                                排序: 相关性 <ChevronDown className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}