"use client";

import React, { useState } from 'react';
import { ClipboardList, Copy, Check, Info, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    // 生成标准报关格式: 1:品名; 2:规格...
    const text = safeItems.map(i => `${i.seq}:${i.name}`).join('; ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center">
            <ClipboardList className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">规范申报要素</h3>
            <p className="text-xs text-slate-500">报关单审单必要填写规格，共 {safeItems.length} 项</p>
          </div>
        </div>

        {safeItems.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopyString}
            className="h-8 text-xs gap-1.5 rounded-xl border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-medium">已复制申报格式</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>一键复制标准格式</span>
              </>
            )}
          </Button>
        )}
      </div>

      <div className="p-5 flex-grow">
        {safeItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-xs border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <Info className="w-8 h-8 mb-2 opacity-30 text-slate-400" />
            该税号暂无独立细分申报要素说明，请参考类章大纲
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {safeItems.map((el, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex items-center p-3 rounded-xl border transition-all duration-200 group relative overflow-hidden",
                  el.required 
                    ? "bg-blue-50/30 border-blue-200/80 hover:border-blue-400" 
                    : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
                )}
              >
                {/* 序号方块 */}
                <div className={cn(
                  "flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-xs font-mono font-bold mr-3 border",
                  el.required 
                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs" 
                    : "bg-slate-100 text-slate-600 border-slate-200"
                )}>
                  {el.seq || idx + 1}
                </div>

                {/* 要素名称 */}
                <span className="flex-grow text-xs sm:text-sm font-medium text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                  {el.name}
                </span>

                {/* 状态徽章 */}
                {el.required ? (
                  <Badge className="ml-2 text-[10px] px-2 h-5 bg-blue-100 text-blue-800 hover:bg-blue-100 border border-blue-200 font-semibold">
                    必填
                  </Badge>
                ) : (
                  <span className="text-[11px] text-slate-400 ml-2">选填</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <p>
            注：规范申报要素是海关审单核价的关键，若申报不全可能导致系统转人工审单或退单，请务必完整核实。
          </p>
        </div>
      </div>
    </div>
  );
}
