import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col sm:flex-row gap-5 items-stretch sm:items-center">

            {/* --- 左侧：核心信息 (占比大) --- */}
            <div className="flex-1 space-y-3 min-w-0">
                {/* 顶部：编码 */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-32 rounded-md" /> {/* Code */}
                    <Skeleton className="h-5 w-16 rounded-full" /> {/* Badge */}
                </div>

                {/* 中间：商品名称 (模拟两行文本) */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                </div>

                {/* 底部：监管条件/单位 (胶囊样式) */}
                <div className="flex flex-wrap gap-2 pt-1">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full ml-auto sm:ml-0" /> {/* Unit */}
                </div>
            </div>

            {/* --- 右侧：数据仪表盘 --- */}
            <div className="flex-shrink-0">
                {/* 模拟仪表盘容器 */}
                <div className="bg-gray-50 rounded-xl p-2 border border-gray-100 flex items-center gap-2">
                    {/* Stat Box 1 */}
                    <div className="flex flex-col items-center gap-1 min-w-[60px]">
                        <Skeleton className="h-3 w-8" />
                        <Skeleton className="h-5 w-12" />
                    </div>
                    {/* Separator */}
                    <div className="h-8 w-px bg-gray-200" />

                    {/* Stat Box 2 */}
                    <div className="flex flex-col items-center gap-1 min-w-[60px]">
                        <Skeleton className="h-3 w-8" />
                        <Skeleton className="h-5 w-12" />
                    </div>
                    {/* Separator */}
                    <div className="h-8 w-px bg-gray-200" />

                    {/* Stat Box 3 */}
                    <div className="flex flex-col items-center gap-1 min-w-[60px]">
                        <Skeleton className="h-3 w-8" />
                        <Skeleton className="h-5 w-12" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SearchSkeleton() {
    return (
        <div className="flex gap-6 items-start animate-in fade-in duration-500">
            {/* 侧边栏骨架 */}
            <aside className="w-64 flex-shrink-0 hidden md:block space-y-6 mt-2">
                <Skeleton className="h-5 w-24 mb-4" /> {/* 标题 */}
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="h-4 w-4 rounded bg-gray-200" />
                            <div className="flex-grow flex justify-between">
                                <Skeleton className="h-4 w-32 bg-gray-100" />
                                <Skeleton className="h-4 w-8 bg-gray-100" />
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* 结果列表骨架 */}
            <div className="flex-grow space-y-4">
                {/* 结果数量提示占位 */}
                <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                </div>

                {[1, 2, 3, 4, 5].map((i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}