"use client";

import React, { useState } from 'react';
import { ClipboardList, Copy, Check, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ElementItem {
  seq: number;
  name: string;
  required: boolean;
}

export default function DeclarationElements({ items = [] }: { items: any[] }) {
  const [copied, setCopied] = useState(false);
  const safeItems: ElementItem[] = Array.isArray(items) ? items : [];

  const handleCopyString = () => {
    const text = safeItems.map(i => `${i.seq}:${i.name}`).join('; ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="h-full flex flex-col shadow-sm border-border">
      <CardHeader className="px-5 py-4 border-b bg-muted/30">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100/50 text-blue-600 rounded-md">
                    <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                    <CardTitle className="text-sm font-bold">申报要素</CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                        共 {safeItems.length} 项要素
                    </CardDescription>
                </div>
            </div>
            
            {safeItems.length > 0 && (
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopyString}
                    className="h-8 text-xs gap-1.5 bg-background hover:bg-accent hover:text-accent-foreground"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">已复制</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3" />
                            <span>复制列表</span>
                        </>
                    )}
                </Button>
            )}
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-grow bg-card">
         {safeItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm border-2 border-dashed border-muted rounded-lg bg-muted/10">
                <Info className="w-8 h-8 mb-2 opacity-20" />
                暂无申报要素信息
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {safeItems.map((el, idx) => (
                    <div 
                        key={idx} 
                        className={cn(
                            "flex items-center p-3 rounded-md border transition-all duration-200 group relative overflow-hidden",
                            el.required 
                                ? "bg-blue-50/40 border-blue-200 hover:border-blue-300" 
                                : "bg-card border-border hover:border-gray-300 hover:bg-gray-50/50"
                        )}
                    >
                        {/* 左侧装饰条 */}
                        {el.required && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500" />}

                        {/* 序号 */}
                        <div className={cn(
                            "flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-xs font-mono font-bold mr-3 border",
                            el.required 
                                ? "bg-white text-blue-600 border-blue-100" 
                                : "bg-muted text-muted-foreground border-border"
                        )}>
                            {el.seq || idx + 1}
                        </div>

                        {/* 名称 */}
                        <span className="flex-grow text-sm font-medium text-foreground group-hover:text-blue-700 transition-colors truncate">
                            {el.name}
                        </span>

                        {/* 标记 */}
                        {el.required ? (
                             <Badge variant="secondary" className="ml-2 text-[10px] px-1.5 h-5 bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">
                                必填
                             </Badge>
                        ) : (
                             <span className="text-[10px] text-muted-foreground/50 ml-2">选填</span>
                        )}
                    </div>
                ))}
            </div>
         )}
      </CardContent>
    </Card>
  );
}