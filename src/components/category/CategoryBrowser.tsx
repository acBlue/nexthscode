"use client";

import React, { useState, useEffect } from 'react';
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

    // 优先从客户端 URL 参数获取选中的大类，没有则默认第 1 个
    const sectionFromUrl = searchParams.get('section');
    const defaultId = sectionFromUrl || initialSectionId || sections[0]?.id || "";
    const [activeSectionId, setActiveSectionId] = useState(defaultId);

    // 监听 URL 变化，实现前进后退时同步切换
    useEffect(() => {
        if (sectionFromUrl && sections.some(s => s.id === sectionFromUrl)) {
            setActiveSectionId(sectionFromUrl);
        }
    }, [sectionFromUrl, sections]);

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
            {/* 左侧导航 */}
            <div className="w-full md:w-auto md:sticky md:top-24">
                <CategorySidebar
                    sections={sections.map(s => ({ id: s.id, roman: s.code, name: s.name }))}
                    activeId={activeSectionId}
                    onSelect={handleSelect}
                />
            </div>

            {/* 右侧内容 */}
            <ChapterGrid
                sectionName={`${activeSection?.code || ''} 类 - ${activeSection?.name || ''}`}
                chapters={currentChapters.map((c: any) => ({
                    code: c.code,
                    name: c.name,
                    desc: c.description || "",
                    count: c.count
                }))}
            />
        </div>
    );
}
