import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Layers } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChapterItem {
    code: string;
    name: string;
    desc: string | null;
    count: number;
}

interface ChapterGridProps {
    sectionName: string;
    chapters: ChapterItem[];
}

export default function ChapterGrid({ sectionName, chapters }: ChapterGridProps) {
    return (
        <div className="flex-grow min-w-0 space-y-6">
            {/* 章节顶部标题 */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                            {sectionName}
                        </h2>
                    </div>
                    <p className="text-xs text-slate-500">
                        点击章节卡片可进入包含的全部商品细目与税率检索
                    </p>
                </div>

                <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200/60 shrink-0">
                    本类下设 {chapters.length} 个章节
                </span>
            </div>

            {/* 章节卡片列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {chapters.map((chapter) => (
                    <Link
                        href={`/search?chapter=${chapter.code}`}
                        key={chapter.code}
                        className="group block h-full outline-none"
                    >
                        <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-lg hover:shadow-blue-900/5 hover:border-blue-300 transition-all duration-300 group-hover:-translate-y-0.5 flex flex-col justify-between relative overflow-hidden">
                            
                            {/* 悬停顶部渐变线 */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Badge 
                                        variant="outline" 
                                        className="text-xs font-mono font-bold bg-slate-50 text-slate-700 border-slate-200 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors"
                                    >
                                        第 {chapter.code} 章
                                    </Badge>
                                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                                    </div>
                                </div>

                                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                                    {chapter.name}
                                </h3>

                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    {chapter.desc || "包含该章下属所有税目商品的品名、申报规范及税率政策。"}
                                </p>
                            </div>

                            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                <span className="flex items-center gap-1.5 font-mono text-slate-500 font-medium">
                                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                                    {chapter.count.toLocaleString()} 条细分税号
                                </span>
                                <span className="text-blue-600 font-medium group-hover:underline">
                                    立即查看
                                </span>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
