"use client";

import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export interface FilterGroup {
    id: string;
    name: string;
    count: number;
}

interface FilterSidebarProps {
    chapters: FilterGroup[];
    selectedChapters: string[];
    onToggleChapter: (code: string) => void;
}

export default function FilterSidebar({ chapters, selectedChapters, onToggleChapter }: FilterSidebarProps) {
    return (
        <aside className="w-64 flex-shrink-0 hidden md:block">
            <div className="sticky top-36 space-y-6 pr-2">
                
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold leading-none">相关章节</h3>
                    <Separator />
                    
                    {chapters.length === 0 ? (
                        <p className="text-xs text-muted-foreground py-2">无相关分类</p>
                    ) : (
                        // 使用 ScrollArea 控制高度
                        <ScrollArea className="h-[calc(100vh-300px)] pr-3">
                            <div className="space-y-3">
                                {chapters.map((chapter) => {
                                    const isChecked = selectedChapters.includes(chapter.id);
                                    return (
                                        <div key={chapter.id} className="flex items-start space-x-2 group">
                                            <Checkbox 
                                                id={`chapter-${chapter.id}`} 
                                                checked={isChecked}
                                                onCheckedChange={() => onToggleChapter(chapter.id)}
                                                className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <div className="grid gap-1.5 leading-none w-full">
                                                <Label
                                                    htmlFor={`chapter-${chapter.id}`}
                                                    className={`text-sm font-normal cursor-pointer leading-tight ${
                                                        isChecked ? 'text-blue-700 font-medium' : 'text-muted-foreground'
                                                    }`}
                                                >
                                                    {chapter.name}
                                                </Label>
                                                <div className="flex justify-end">
                                                    <span className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm">
                                                        {chapter.count}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    )}
                </div>

            </div>
        </aside>
    );
}