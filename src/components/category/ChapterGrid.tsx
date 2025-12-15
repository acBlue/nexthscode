import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';
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
        <div className="flex-grow min-w-0">
            {/* 顶部标题区 */}
            <div className="mb-6 space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{sectionName}</h1>
                <p className="text-muted-foreground text-sm">
                    包含 {chapters.length} 个章节
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {chapters.map((chapter) => (
                    <Link
                        href={`/search?chapter=${chapter.code}`}
                        key={chapter.code}
                        className="group block h-full"
                    >
                        <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 flex flex-col relative overflow-hidden">
                            <CardHeader className="pb-2 space-y-2">
                                <div className="flex justify-between items-start">
                                    <Badge variant="outline" className="text-sm font-mono font-bold bg-muted/50 text-foreground group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
                                        第 {chapter.code} 章
                                    </Badge>
                                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                                <CardTitle className="text-base font-bold leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
                                    {chapter.name}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex-grow pb-3">
                                <CardDescription className="text-xs line-clamp-2">
                                    {chapter.desc || "暂无详细描述"}
                                </CardDescription>
                            </CardContent>

                            <CardFooter className="pt-0 pb-4">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>{chapter.count.toLocaleString()} 条目</span>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}