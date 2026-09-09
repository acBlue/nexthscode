import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryBrowser from '@/components/category/CategoryBrowser';
import { getAllSectionsWithChapters } from '@/services/category.service';
import { Layers, Sparkles, BookOpen, Compass } from 'lucide-react';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const sections = await getAllSectionsWithChapters();
    const rawSection = resolvedSearchParams.section;
    const initialSectionId = typeof rawSection === 'string' ? rawSection : undefined;

    return (
        <div className="min-h-screen bg-slate-50/60 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
            <Navbar />

            {/* 顶部质感 Banner */}
            <div className="bg-white border-b border-slate-200/90 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate opacity-40 pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-semibold">
                                <Compass className="w-3.5 h-3.5" />
                                国际海关 WCO 协调制度标准分类
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                全部分类目录大纲
                            </h1>
                            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                                依照《商品名称及编码协调制度》(Harmonized System) 权威划分的 21 大类、98 个章节，逐层钻取查询目标商品税号。
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 self-start md:self-auto">
                            <div className="text-center px-3 border-r border-slate-200">
                                <span className="block text-2xl font-mono font-extrabold text-blue-600">21</span>
                                <span className="text-[11px] text-slate-500 font-medium">类商品</span>
                            </div>
                            <div className="text-center px-3">
                                <span className="block text-2xl font-mono font-extrabold text-indigo-600">98</span>
                                <span className="text-[11px] text-slate-500 font-medium">个章次</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <CategoryBrowser sections={sections} initialSectionId={initialSectionId} />
            </main>

            <Footer />
        </div>
    );
}
