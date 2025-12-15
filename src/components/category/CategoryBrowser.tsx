"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // 引入路由钩子
import CategorySidebar from './CategorySidebar';
import ChapterGrid from './ChapterGrid';

interface CategoryBrowserProps {
    sections: any[];
    initialSectionId?: string; // 新增 Props
}

export default function CategoryBrowser({ sections, initialSectionId }: CategoryBrowserProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 1. 初始化状态逻辑：
    // 优先用 Props 传进来的 ID -> 其次用 URL 参数(防止组件内部重新挂载) -> 最后默认选第一个
    const defaultId = initialSectionId || sections[0]?.id || "";

    const [activeSectionId, setActiveSectionId] = useState(defaultId);

    // 2. 查找当前选中的大类数据
    const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];
    const currentChapters = activeSection?.chapters || [];

    // 3. 处理点击切换
    const handleSelect = (id: string) => {
        setActiveSectionId(id);

        // [优化体验] 更新 URL，但不刷新页面
        // 这样用户按 F5 刷新后，依然会停留在当前选中的类
        const params = new URLSearchParams(searchParams.toString());
        params.set('section', id);
        router.replace(`/category?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* 左侧导航 */}
            <CategorySidebar
                sections={sections.map(s => ({ id: s.id, roman: s.code, name: s.name }))}
                activeId={activeSectionId}
                onSelect={handleSelect} // 使用新的处理函数
            />

            {/* 右侧内容 */}
            <ChapterGrid
                sectionName={`${activeSection?.code} 类 - ${activeSection?.name}`}
                chapters={currentChapters.map((c: any) => ({
                    code: c.code,
                    name: c.name,
                    desc: "",
                    count: c.count
                }))}
            />
        </div>
    );
}