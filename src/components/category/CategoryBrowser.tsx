"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CategorySidebar from './CategorySidebar';
import ChapterGrid from './ChapterGrid';

interface CategoryBrowserProps {
    sections: any[];
    initialSectionId?: string;
}

export default function CategoryBrowser({ sections, initialSectionId }: CategoryBrowserProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const defaultId = initialSectionId || sections[0]?.id || "";
    const [activeSectionId, setActiveSectionId] = useState(defaultId);

    const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];
    const currentChapters = activeSection?.chapters || [];

    const handleSelect = (id: string) => {
        setActiveSectionId(id);
        const params = new URLSearchParams(searchParams.toString());
        params.set('section', id);
        router.replace(`/category?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start w-full">
            {/* 左侧导航 - 在移动端会变成顶部列表，但在桌面端是侧边栏 */}
            <div className="w-full md:w-auto md:sticky md:top-24">
                <CategorySidebar
                    sections={sections.map(s => ({ id: s.id, roman: s.code, name: s.name }))}
                    activeId={activeSectionId}
                    onSelect={handleSelect}
                />
            </div>

            {/* 右侧内容 */}
            <ChapterGrid
                sectionName={`${activeSection?.code} 类 - ${activeSection?.name}`}
                chapters={currentChapters.map((c: any) => ({
                    code: c.code,
                    name: c.name,
                    desc: c.description || "", // 确保字段名对应你的API返回
                    count: c.count
                }))}
            />
        </div>
    );
}