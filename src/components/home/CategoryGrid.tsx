"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Fish, 
  Wheat, 
  Droplet, 
  Cookie, 
  Gem, 
  Atom, 
  Shirt, 
  Footprints,
  Cpu,
  Car,
  Package,
  Boxes,
  Stethoscope,
  LucideIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CategoryItem {
  id: string;
  code: string;
  name: string;
}

const iconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  "I": { icon: Fish, color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10 group-hover:bg-sky-600 dark:group-hover:bg-sky-500" },
  "II": { icon: Wheat, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500" },
  "III": { icon: Droplet, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 group-hover:bg-amber-600 dark:group-hover:bg-amber-500" },
  "IV": { icon: Cookie, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10 group-hover:bg-orange-600 dark:group-hover:bg-orange-500" },
  "V": { icon: Gem, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500" },
  "VI": { icon: Atom, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10 group-hover:bg-purple-600 dark:group-hover:bg-purple-500" },
  "XI": { icon: Shirt, color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-500/10 group-hover:bg-pink-600 dark:group-hover:bg-pink-500" },
  "XII": { icon: Footprints, color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-500/10 group-hover:bg-teal-600 dark:group-hover:bg-teal-500" },
  "XVI": { icon: Cpu, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10 group-hover:bg-blue-600 dark:group-hover:bg-blue-500" },
  "XVII": { icon: Car, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10 group-hover:bg-rose-600 dark:group-hover:bg-rose-500" },
  "XVIII": { icon: Stethoscope, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500" },
};

export default function CategoryGrid({ items }: { items: CategoryItem[] }) {
  const displayItems = items.slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-[#090d16] border-b border-slate-200/60 dark:border-white/[0.08] transition-colors duration-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 标题区 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-500/20">
              <Boxes className="w-3.5 h-3.5" />
              商品层级索引体系
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              热门商品类目快速导航
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              按照国际海关 WCO 协调制度标准体系划分，快速定位您的货物归类与所属章次
            </p>
          </div>

          <Button 
            variant="outline" 
            className="gap-2 self-start md:self-auto border-slate-200 dark:border-white/[0.1] hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 transition-all rounded-xl" 
            asChild
          >
            <Link href="/category">
              浏览全套 21 大类
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayItems.map((item) => {
            const meta = iconMap[item.code] || { 
              icon: Package, 
              color: "text-blue-600 dark:text-blue-400", 
              bg: "bg-blue-50 dark:bg-blue-500/10 group-hover:bg-blue-600 dark:group-hover:bg-blue-500" 
            };
            const IconComponent = meta.icon;

            return (
              <Link 
                key={item.id} 
                href={`/category?section=${item.id}`} 
                className="group block outline-none"
              >
                <div className="h-full bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] p-5 shadow-xs hover:shadow-xl hover:shadow-blue-900/5 dark:hover:shadow-black/50 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
                  
                  {/* 悬停微光线条 */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl ${meta.bg} flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:shadow-md`}>
                        <IconComponent className={`w-6 h-6 ${meta.color} group-hover:text-white transition-colors duration-300`} />
                      </div>

                      <Badge 
                        variant="secondary" 
                        className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08] group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                      >
                        第 {item.code} 类
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-relaxed min-h-[2.75rem]">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span className="font-medium">进入章节列表</span>
                    <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
