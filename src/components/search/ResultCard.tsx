"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Microscope, 
  ChevronRight,
  TrendingUp,
  Box,
  Copy,
  Check,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ResultItem {
  id: string;
  cleanCode: string;
  code: string;
  name: string;
  unit1: string | null;
  unit2: string | null;
  regulatoryCode: string | null;
  quarantineCode?: string | null;
  mfnRate: string | null;        
  generalRate?: string | null;
  tempRate?: string | null;       
  vatRate: string | null;
  consumptionRate?: string | null; 
  exportRebateRate: string | null; 
}

const StatBox = ({ label, value, sub, highlight, className }: any) => (
  <div className={cn("flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all min-w-[72px]", className)}>
    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
      {label}
    </span>
    <div className="flex items-baseline gap-0.5">
      <span className={cn(
        "text-sm font-bold font-mono leading-none",
        highlight ? "text-blue-600 font-extrabold text-base" : "text-slate-800"
      )}>
        {value || '-'}
      </span>
      {sub && <span className="text-[9px] text-amber-600 font-bold ml-0.5">{sub}</span>}
    </div>
  </div>
);

export default function ResultCard({ item }: { item: ResultItem }) {
  const [copied, setCopied] = useState(false);
  const linkId = item.cleanCode || item.id;
  const detailUrl = `/hscode/${linkId}`;
  
  const hasConsumption = item.consumptionRate && item.consumptionRate !== '0';
  const hasTemp = !!item.tempRate;

  // 构造直达税费计算器的链接
  const dutyRateVal = item.tempRate || item.mfnRate || "0";
  const vatRateVal = item.vatRate || "13";
  const consRateVal = item.consumptionRate || "0";
  const calcUrl = `/tools/tax?duty=${parseFloat(dutyRateVal) || 0}&vat=${parseFloat(vatRateVal) || 13}&consumption=${parseFloat(consRateVal) || 0}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(item.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      
      {/* 顶部或左侧状态条 */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 via-indigo-600 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 sm:p-6 flex flex-col lg:flex-row gap-5 lg:items-center justify-between">
        
        {/* 左侧主体信息 */}
        <div className="flex-1 min-w-0 space-y-3">
          
          {/* 编码行 */}
          <div className="flex items-center flex-wrap gap-2.5">
            <Link 
              href={detailUrl} 
              className="inline-flex items-center font-mono text-xl sm:text-2xl font-extrabold text-blue-700 tracking-tight bg-blue-50/70 hover:bg-blue-100 px-3 py-1 rounded-xl border border-blue-200/60 transition-colors"
            >
              {item.code}
            </Link>

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-200/60 transition-all cursor-pointer"
              title="复制海关编码"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {hasTemp && (
              <Badge className="h-5 px-2 text-[10px] bg-amber-50 text-amber-800 border-amber-200 font-semibold">
                暂定税率优先
              </Badge>
            )}

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-600">
              <Box className="w-3 h-3 text-slate-400" />
              <span>{item.unit1 || '-'}{item.unit2 ? ` / ${item.unit2}` : ''}</span>
            </div>
          </div>

          {/* 品名 */}
          <Link href={detailUrl} className="block group-hover:text-blue-600 transition-colors">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {item.name}
            </h3>
          </Link>

          {/* 监管与检疫 */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {item.regulatoryCode ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-50/80 text-indigo-700 text-xs font-semibold border border-indigo-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                监管条件: {item.regulatoryCode}
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">无特殊监管条件</span>
            )}

            {item.quarantineCode && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-50/80 text-emerald-700 text-xs font-semibold border border-emerald-100">
                <Microscope className="w-3.5 h-3.5" />
                检验检疫: {item.quarantineCode}
              </span>
            )}

            {hasConsumption && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-amber-700 bg-amber-50 rounded-lg border border-amber-200">
                <TrendingUp className="w-3 h-3 text-amber-600" />
                消费税率 {item.consumptionRate}
              </span>
            )}
          </div>

        </div>

        {/* 右侧：税率看板与操作 */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          
          <div className="flex items-center bg-slate-50/90 rounded-2xl p-1.5 border border-slate-200/80 shadow-2xs">
            <StatBox 
              label="最惠国" 
              value={item.tempRate || item.mfnRate} 
              sub={item.tempRate ? "暂" : ""}
              highlight={true}
              className="bg-white shadow-2xs border border-slate-100"
            />
            
            <Separator orientation="vertical" className="h-7 mx-1 bg-slate-200" />

            <StatBox 
              label="增值税" 
              value={item.vatRate} 
            />

            <Separator orientation="vertical" className="h-7 mx-1 bg-slate-200" />

            <StatBox 
              label="出口退税" 
              value={item.exportRebateRate} 
            />
          </div>

          {/* 快捷按钮 */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs font-medium border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg"
              asChild
            >
              <Link href={calcUrl}>
                <Calculator className="w-3.5 h-3.5 mr-1 text-blue-600" />
                测算税费
              </Link>
            </Button>

            <Button 
              size="sm" 
              className="h-8 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-2xs"
              asChild
            >
              <Link href={detailUrl}>
                查看详情
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}
