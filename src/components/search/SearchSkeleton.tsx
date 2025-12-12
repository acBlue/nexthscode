import React from 'react';

// 单个卡片的骨架
function CardSkeleton() {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-5 animate-pulse">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-grow space-y-3">
                    {/* 标题行占位 */}
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-32 bg-gray-200 rounded"></div>
                        <div className="h-5 w-16 bg-gray-100 rounded"></div>
                    </div>
                    {/* 中文名占位 */}
                    <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                    {/* 英文名占位 */}
                    <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                </div>
                {/* 星星图标占位 */}
                <div className="h-6 w-6 bg-gray-100 rounded-full"></div>
            </div>

            {/* 数据网格占位 (4个方块) */}
            <div className="grid grid-cols-4 gap-1 mt-4 mb-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className="h-3 w-12 bg-gray-200 rounded"></div>
                        <div className="h-5 w-10 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>

            {/* 底部按钮行占位 */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="h-4 w-24 bg-gray-100 rounded"></div>
                <div className="flex gap-3">
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    <div className="h-8 w-16 bg-blue-100 rounded"></div>
                </div>
            </div>
        </div>
    );
}

export default function SearchSkeleton() {
    return (
        <div className="flex gap-6 items-start animate-in fade-in duration-500">

            {/* 1. 左侧侧边栏骨架 (PC端显示) */}
            <aside className="w-64 flex-shrink-0 hidden md:block space-y-6">
                <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                                <div className="h-4 w-32 bg-gray-100 rounded"></div>
                            </div>
                            <div className="h-4 w-6 bg-gray-100 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* 2. 右侧结果列表骨架 */}
            <div className="flex-grow space-y-4">
                {/* 模拟 5 个卡片 */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}