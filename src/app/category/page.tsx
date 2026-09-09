import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryBrowser from '@/components/category/CategoryBrowser';
import { getAllSectionsWithChapters } from '@/services/category.service';
import { Compass } from 'lucide-react';

export const revalidate = 86400;

function CategoryBrowserSkeleton() {
    return (
        <div className="flex flex-col md:flex-row gap-6 items-start w-full animate-pulse">
            <div className="w-full md:w-80 h-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800" />
            <div className="flex-1 w-full space-y-4">
                <div className="h-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-40 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default async function CategoryPage() {
    const sections = await getAllSectionsWithChapters();

    return (
        <div className="min-h-screen bg-slate-50/60 dark:bg-[#080c14] font-sans flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200">
            <Navbar />

            {/* 顶部质感 Banner */}
            <div className="bg-white dark:bg-[#0b101c] border-b border-slate-200/90 dark:border-white/[0.08] relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate opacity-40 dark:opacity-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-500/30 text-xs font-semibold">
                                <Compass className="w-3.5 h-3.5" />
                                国际海关 WCO 协调制度标准分类
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                全部分类目录大纲
                            </h1>
                            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                                依照《商品名称及编码协调制度》(Harmonized System) 权威划分的 21 大类、98 个章节，逐层钻取查询目标商品税号。
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-50 dark:bg-[#0f172a] border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-4 self-start md:self-auto">
                            <div className="text-center px-3 border-r border-slate-200 dark:border-white/[0.08]">
                                <span className="block text-2xl font-mono font-extrabold text-blue-600 dark:text-blue-400">21</span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">类商品</span>
                            </div>
                            <div className="text-center px-3">
                                <span className="block text-2xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">98</span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">个章次</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <Suspense fallback={<CategoryBrowserSkeleton />}>
                    <CategoryBrowser sections={sections} />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
