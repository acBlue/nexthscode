import React from 'react';
import { cn } from "@/lib/utils";

interface TaxItem {
  label: string;
  value: string | null;
  highlight?: boolean; 
  desc?: string; 
}

interface TaxInfoCardProps {
    title: string;
    items: TaxItem[];
    icon?: React.ElementType;
}

export default function TaxInfoCard({ title, items, icon: Icon }: TaxInfoCardProps) {
  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-2xs overflow-hidden print:break-inside-avoid print:shadow-none print:border-black transition-colors duration-200">
      <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-900/60 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
           {Icon && (
             <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
               <Icon className="w-3.5 h-3.5" />
             </div>
           )}
           <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{title}</h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400">税则口径</span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className={cn(
              "flex justify-between items-center px-5 py-3 transition-colors",
              item.highlight ? "bg-blue-50/30 dark:bg-blue-500/10" : "hover:bg-slate-50/60 dark:hover:bg-white/5"
            )}
          >
            <div className="space-y-0.5">
              <span className={cn(
                "text-xs font-medium block",
                item.highlight ? "text-slate-900 dark:text-white font-semibold" : "text-slate-600 dark:text-slate-400"
              )}>
                {item.label}
              </span>
              {item.desc && (
                <span className="inline-block text-[10px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/15 px-1.5 py-0.2 rounded font-medium border border-amber-200/60 dark:border-amber-500/30">
                  {item.desc}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className={cn(
                "font-mono font-bold text-sm",
                item.highlight ? "text-base text-blue-700 dark:text-blue-400 font-extrabold" : "text-slate-800 dark:text-slate-200"
              )}>
                {item.value || '-'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
