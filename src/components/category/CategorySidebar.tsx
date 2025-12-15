import React from 'react';
import { Layers } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SectionItem {
    id: string;
    roman: string;
    name: string;
}

interface SidebarProps {
    sections: SectionItem[];
    activeId: string;
    onSelect: (id: string) => void;
}

export default function CategorySidebar({ sections, activeId, onSelect }: SidebarProps) {
    return (
        <div className={cn(
            "w-full md:w-72 flex-shrink-0 bg-background border rounded-xl shadow-sm flex flex-col overflow-hidden",
            // 移动端：限制最大高度，允许滚动
            "h-auto max-h-[40vh]",
            // 桌面端：固定高度计算，配合 Sticky 使用
            "md:h-[calc(100vh-140px)]" 
        )}>
            {/* 顶部标题区 - 固定不滚动 */}
            <div className="p-4 flex items-center gap-2 flex-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
                <Layers className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">分类导航</h2>
            </div>
            
            <Separator className="flex-none" />
            
            {/* 滚动区域 - 关键修复：flex-1 和 min-h-0 确保 ScrollArea 在 flex 容器内生效 */}
            <div className="flex-1 min-h-0 relative">
                <ScrollArea className="h-full w-full">
                    <div className="p-2 flex flex-col gap-1">
                        {sections.map((section) => {
                            const isActive = activeId === section.id;
                            return (
                                <Button
                                    key={section.id}
                                    variant={isActive ? "secondary" : "ghost"}
                                    // 添加 whitespace-normal 和 h-auto 确保长文本能换行且不溢出
                                    className={cn(
                                        "w-full justify-start h-auto py-3 px-3 text-left whitespace-normal font-normal",
                                        isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-100 font-medium"
                                    )}
                                    onClick={() => onSelect(section.id)}
                                >
                                    <div className="flex gap-3 items-start w-full min-w-0">
                                        <Badge 
                                            variant={isActive ? "default" : "outline"}
                                            className={cn(
                                                "mt-0.5 px-1.5 min-w-[32px] justify-center flex-shrink-0",
                                                isActive ? "bg-blue-600 hover:bg-blue-700" : "text-muted-foreground border-border"
                                            )}
                                        >
                                            {section.roman}
                                        </Badge>
                                        {/* truncate 配合 line-clamp 防止文字横向溢出 */}
                                        <span className="text-sm leading-tight line-clamp-2 break-words">
                                            {section.name}
                                        </span>
                                    </div>
                                </Button>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}