import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden print:break-inside-avoid print:shadow-none print:border-black">
      <div className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
           {Icon && (
             <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
               <Icon className="w-3.5 h-3.5" />
             </div>
           )}
           <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">税则口径</span>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className={cn(
              "flex justify-between items-center px-5 py-3 transition-colors",
              item.highlight ? "bg-blue-50/30" : "hover:bg-slate-50/60"
            )}
          >
            <div className="space-y-0.5">
              <span className={cn(
                "text-xs font-medium block",
                item.highlight ? "text-slate-900 font-semibold" : "text-slate-600"
              )}>
                {item.label}
              </span>
              {item.desc && (
                <span className="inline-block text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-medium border border-amber-200/60">
                  {item.desc}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className={cn(
                "font-mono font-bold text-sm",
                item.highlight ? "text-base text-blue-700 font-extrabold" : "text-slate-800"
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
