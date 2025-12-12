import React from 'react';

export default function DetailSkeleton() {
    return (
        <div className="animate-pulse">

            {/* 1. 顶部 Header 骨架 */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-grow">
                            {/* 面包屑占位 */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="h-3 w-10 bg-gray-200 rounded"></div>
                                <div className="h-3 w-3 bg-gray-200 rounded"></div>
                                <div className="h-3 w-10 bg-gray-200 rounded"></div>
                                <div className="h-3 w-3 bg-gray-200 rounded"></div>
                                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                            </div>

                            {/* HS Code 大标题占位 */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-9 w-48 bg-gray-300 rounded"></div>
                                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                                <div className="h-6 w-16 bg-green-50 rounded border border-green-100"></div>
                            </div>

                            {/* 中文名占位 */}
                            <div className="h-7 w-3/4 max-w-lg bg-gray-200 rounded mb-2"></div>
                            {/* 英文名占位 */}
                            <div className="h-4 w-1/2 max-w-md bg-gray-100 rounded"></div>
                        </div>

                        {/* 右侧按钮占位 */}
                        <div className="flex gap-3 mt-1">
                            <div className="h-9 w-24 bg-gray-200 rounded"></div>
                            <div className="h-9 w-32 bg-blue-100 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* --- 左侧侧边栏骨架 (3列) --- */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* 章节信息骨架 */}
                        <div className="bg-white rounded-lg border border-gray-200 h-48 p-4 space-y-4">
                            <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                            <div className="pl-4 border-l-2 border-gray-100 space-y-2">
                                <div className="h-3 w-10 bg-gray-200 rounded"></div>
                                <div className="h-4 w-full bg-gray-100 rounded"></div>
                            </div>
                            <div className="pl-4 border-l-2 border-gray-100 space-y-2">
                                <div className="h-3 w-10 bg-gray-200 rounded"></div>
                                <div className="h-4 w-full bg-gray-100 rounded"></div>
                            </div>
                        </div>

                        {/* 监管/CIQ 骨架 (复用两次) */}
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <div className="w-8 h-6 bg-gray-200 rounded"></div>
                                        <div className="flex-grow h-6 bg-gray-100 rounded"></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-8 h-6 bg-gray-200 rounded"></div>
                                        <div className="flex-grow h-6 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- 右侧主内容骨架 (9列) --- */}
                    <div className="lg:col-span-9 space-y-6">

                        {/* 基础税率 (4个卡片) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 h-24 flex flex-col justify-center">
                                    <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-7 w-20 bg-gray-300 rounded"></div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 协定税率表骨架 */}
                            <div className="bg-white rounded-lg border border-gray-200 h-80 p-5">
                                <div className="flex justify-between mb-4">
                                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-12 bg-gray-100 rounded"></div>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((row) => (
                                        <div key={row} className="flex gap-4">
                                            <div className="w-1/3 h-4 bg-gray-100 rounded"></div>
                                            <div className="w-1/3 h-4 bg-gray-100 rounded"></div>
                                            <div className="w-1/3 h-4 bg-gray-100 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 申报要素表骨架 */}
                            <div className="bg-white rounded-lg border border-gray-200 h-80 p-5">
                                <div className="flex justify-between mb-4">
                                    <div className="h-5 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-20 bg-gray-100 rounded"></div>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((row) => (
                                        <div key={row} className="flex gap-3 items-center">
                                            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                                            <div className="w-12 h-4 bg-gray-100 rounded"></div>
                                            <div className="flex-grow h-4 bg-gray-100 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}