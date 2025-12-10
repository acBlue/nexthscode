import React from 'react';
import { BookOpen } from 'lucide-react';

interface CategoryProps {
    section: { code: string; name: string };
    chapter: { code: string; name: string };
}

export default function ChapterInfo({ data }: { data: CategoryProps }) {
    return (
        <section className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <h3 className="font-bold text-sm text-gray-800">所属章节</h3>
            </div>
            <div className="p-4 space-y-4">
                <div className="relative pl-4 border-l-2 border-blue-200">
                    <div className="text-xs text-gray-500 mb-0.5">类 (Section)</div>
                    <div className="text-sm font-medium text-blue-900">{data.section.code}</div>
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2" title={data.section.name}>
                        {data.section.name}
                    </div>
                </div>
                <div className="relative pl-4 border-l-2 border-blue-400">
                    <div className="text-xs text-gray-500 mb-0.5">章 (Chapter)</div>
                    <div className="text-sm font-medium text-blue-900">{data.chapter.code}</div>
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2" title={data.chapter.name}>
                        {data.chapter.name}
                    </div>
                </div>
            </div>
        </section>
    );
}