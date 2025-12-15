import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Microscope, 
  ChevronRight,
  TrendingUp,
  Box
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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

// 辅助组件：数据小方块 (带背景色)
const StatBox = ({ label, value, sub, className }: any) => (
  <div className={cn("flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[70px]", className)}>
    <span className="text-[10px] text-muted-foreground/80 font-medium uppercase tracking-wider mb-0.5">
        {label}
    </span>
    <div className="flex items-baseline gap-0.5">
       <span className="text-sm font-bold font-mono text-foreground leading-none">
          {value || '-'}
       </span>
       {sub && <span className="text-[9px] text-blue-600 font-bold">{sub}</span>}
    </div>
  </div>
);

export default function ResultCard({ item }: { item: ResultItem }) {
  const linkId = item.cleanCode || item.id;
  const detailUrl = `/hscode/${linkId}`;
  
  const hasConsumption = item.consumptionRate && item.consumptionRate !== '0';
  const hasTemp = !!item.tempRate;

  return (
    <div className="group relative bg-white border border-border/60 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.1)] hover:border-blue-300/50 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      
      {/* 1. 核心修复：全卡片点击链接 */}
      {/* 这是一个覆盖在整个卡片上的隐形链接，点击任何地方都会跳转 */}
      <Link href={detailUrl} className="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl">
        <span className="sr-only">查看 {item.code} 详情</span>
      </Link>

      {/* 2. 左侧装饰条 */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 flex flex-col sm:flex-row gap-5 items-stretch sm:items-center relative z-0">
        
        {/* --- 左侧：核心信息 (占比大) --- */}
        <div className="flex-1 min-w-0 flex flex-col justify-center space-y-2">
            
            {/* 顶部：编码与标签 */}
            <div className="flex items-center flex-wrap gap-2">
                 <div className="font-mono text-xl font-extrabold text-blue-700 tracking-tight bg-blue-50/50 px-2 py-0.5 rounded-md border border-blue-100/50 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors duration-300">
                    {item.code}
                 </div>
                 
                 {/* 暂定税率标签 */}
                 {hasTemp && (
                    <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-amber-50 text-amber-700 border-amber-200">
                        暂定税率
                    </Badge>
                 )}
            </div>
            
            {/* 中间：商品名称 */}
            <h3 className="text-base font-medium text-gray-900 leading-snug line-clamp-2 pr-2">
                {item.name}
            </h3>

            {/* 底部：监管条件 (胶囊样式) */}
            <div className="flex flex-wrap gap-2 pt-1">
                {item.regulatoryCode ? (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-medium text-slate-600 border border-slate-200">
                        <ShieldCheck className="w-3 h-3 text-slate-500" />
                        <span>监管 {item.regulatoryCode}</span>
                    </div>
                ) : null}
                
                {item.quarantineCode && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-medium text-slate-600 border border-slate-200">
                        <Microscope className="w-3 h-3 text-slate-500" />
                        <span>检疫 {item.quarantineCode}</span>
                    </div>
                )}
                {/* 单位显示 (如果没有监管代码，显示在这里显得不空) */}
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 text-[10px] font-medium text-slate-500 border border-slate-100 ml-auto sm:ml-0">
                    <Box className="w-3 h-3" />
                    <span>{item.unit1 || '-'}{item.unit2 ? ` / ${item.unit2}` : ''}</span>
                </div>
            </div>
        </div>

        {/* --- 右侧：数据仪表盘 (胶囊化设计) --- */}
        <div className="flex-shrink-0">
            <div className="flex items-center bg-gray-50/80 rounded-xl p-1.5 border border-gray-100 group-hover:bg-blue-50/30 group-hover:border-blue-100 transition-colors">
                
                {/* 1. 最惠国 */}
                <StatBox 
                    label="最惠国" 
                    value={item.tempRate || item.mfnRate} 
                    sub={item.tempRate ? "暂" : ""}
                    className="bg-white shadow-sm border border-gray-100/50" // 突出显示
                />
                
                <Separator orientation="vertical" className="h-8 mx-1 bg-gray-200/50" />

                {/* 2. 增值税 */}
                <StatBox 
                    label="增值税" 
                    value={item.vatRate} 
                    className="hover:bg-white hover:shadow-sm"
                />

                <Separator orientation="vertical" className="h-8 mx-1 bg-gray-200/50" />

                {/* 3. 退税 */}
                <StatBox 
                    label="退税率" 
                    value={item.exportRebateRate} 
                    className="hover:bg-white hover:shadow-sm"
                />

                {/* 4. 跳转箭头 (仅装饰) */}
                <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full ml-1 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                    <ChevronRight className="w-5 h-5" />
                </div>
            </div>
            
            {/* 警告行：消费税 (在仪表盘下方) */}
            {hasConsumption && (
                 <div className="mt-2 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        消费税 {item.consumptionRate}
                    </span>
                 </div>
            )}
        </div>

      </div>
    </div>
  );
}