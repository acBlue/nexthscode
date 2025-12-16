import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailSkeleton() {
    return (
        <div className="animate-pulse bg-gray-50/30 min-h-screen">

            {/* 1. 顶部 Header 骨架 (Sticky) */}
            <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-col gap-4">
                        {/* 面包屑 */}
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-3 w-10" />
                            <Skeleton className="h-3 w-3" />
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-3" />
                            <Skeleton className="h-3 w-20" />
                        </div>

                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div className="space-y-2 flex-grow">
                                {/* HS Code + 复制按钮 + 状态标 */}
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-9 w-48 rounded-md" />
                                    <Skeleton className="h-8 w-8 rounded-md" />
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                </div>

                                {/* 中文名 */}
                                <Skeleton className="h-7 w-3/4 max-w-lg mt-1" />
                                {/* 英文名 */}
                                <Skeleton className="h-4 w-1/2 max-w-md" />
                            </div>

                            {/* 右侧按钮 */}
                            <div className="flex gap-2">
                                <Skeleton className="h-9 w-28 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* --- 左侧侧边栏骨架 (3列) --- */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* 章节信息 Card */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="h-10 bg-gray-50 border-b border-gray-200 px-4 flex items-center">
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="pl-4 border-l-2 border-gray-200 space-y-1">
                                    <Skeleton className="h-3 w-12 mb-1" />
                                    <Skeleton className="h-4 w-8" />
                                    <Skeleton className="h-3 w-full" />
                                </div>
                                <div className="pl-4 border-l-2 border-gray-200 space-y-1">
                                    <Skeleton className="h-3 w-12 mb-1" />
                                    <Skeleton className="h-4 w-8" />
                                    <Skeleton className="h-3 w-full" />
                                </div>
                            </div>
                        </div>

                        {/* 监管/CIQ Card (模拟 RegulatoryCard) */}
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="h-10 bg-gray-50 border-b border-gray-200 px-4 flex items-center">
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="p-2 space-y-1">
                                    {[1, 2].map((j) => (
                                        <div key={j} className="flex items-center gap-3 p-2">
                                            <Skeleton className="h-6 w-8 rounded-sm" />
                                            <Skeleton className="h-4 flex-grow rounded-sm" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- 右侧主内容骨架 (9列) --- */}
                    <div className="lg:col-span-9 space-y-6">

                        {/* 基础税率 (4个独立卡片) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 h-24 flex flex-col justify-between relative overflow-hidden">
                                    {/* 侧边装饰条 */}
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-200"></div>
                                    <Skeleton className="h-3 w-20 ml-2" />
                                    <Skeleton className="h-7 w-16 ml-2" />
                                    <Skeleton className="h-2 w-24 ml-2 opacity-50" />
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* 协定税率表骨架 (AgreementRates) */}
                            <div className="bg-white rounded-lg border border-gray-200 h-[400px] flex flex-col overflow-hidden">
                                <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-3 w-12" />
                                </div>
                                <div className="flex-grow p-0">
                                    {/* 表头 */}
                                    <div className="flex gap-4 px-5 py-2 bg-gray-50 border-b border-gray-100">
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-4 w-1/3 ml-auto" />
                                    </div>
                                    {/* 表格行 */}
                                    <div className="space-y-0 divide-y divide-gray-100">
                                        {[1, 2, 3, 4, 5, 6].map((row) => (
                                            <div key={row} className="flex gap-4 px-5 py-3">
                                                <Skeleton className="h-4 w-1/3" />
                                                <Skeleton className="h-4 w-1/3" />
                                                <Skeleton className="h-4 w-16 ml-auto" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 申报要素表骨架 (DeclarationElements) */}
                            <div className="bg-white rounded-lg border border-gray-200 h-[400px] flex flex-col overflow-hidden">
                                <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                    <div className="space-y-1">
                                        <Skeleton className="h-5 w-24" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                    <Skeleton className="h-8 w-20 rounded-md" />
                                </div>
                                <div className="p-5 overflow-hidden">
                                    <div className="grid grid-cols-1 gap-3">
                                        {[1, 2, 3, 4, 5].map((row) => (
                                            <div key={row} className="flex items-center p-3 rounded-md border border-gray-100 bg-gray-50/50 gap-3">
                                                <Skeleton className="w-7 h-7 rounded-md" />
                                                <Skeleton className="h-4 flex-grow" />
                                                <Skeleton className="h-4 w-8 rounded-full" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}