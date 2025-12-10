import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ChapterItem {
    code: string;
    name: string;
    desc: string;
    count: number; // 该章下的编码数量
}

interface ChapterGridProps {
    sectionName: string; // 当前选中的大类名称
    chapters: ChapterItem[];
}

export default function ChapterGrid({ sectionName, chapters }: ChapterGridProps) {
    return (
        <div className="flex-grow">
            {/* 顶部标题区 */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{sectionName}</h1>
                <p className="text-gray-500 text-sm">
                    共包含 <span className="font-bold text-gray-900">{chapters.length}</span> 个章节
                </p>
            </div>

            {/* 章节卡片网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {chapters.map((chapter) => (
                    <Link
                        href={`/search?chapter=${chapter.code}`} // 点击跳转到搜索页并带上参数
                        key={chapter.code}
                        className="group block bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all relative overflow-hidden"
                    >
                        {/* 装饰背景圆圈 */}
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors"></div>

                        <div className="relative">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                        {chapter.code}
                                    </div>
                                    <span className="text-xs text-gray-400 font-mono">CHAPTER</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </div>

                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors h-12">
                                {chapter.name}
                            </h3>

                            <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">
                                {chapter.desc}
                            </p>

                            <div className="pt-3 border-t border-gray-50 flex justify-between items-center text-xs">
                                <span className="text-gray-400">包含条目</span>
                                <span className="font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                  {chapter.count.toLocaleString()}
                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}