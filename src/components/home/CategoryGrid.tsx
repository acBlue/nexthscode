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
  Sparkles,
  LucideIcon
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CategoryItem {
  id: string;
  code: string;
  name: string;
}

// 精致图标映射表
const iconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  "I": { icon: Fish, color: "text-sky-600", bg: "bg-sky-50 group-hover:bg-sky-600" },
  "II": { icon: Wheat, color: "text-emerald-600", bg: "bg-emerald-50 group-hover:bg-emerald-600" },
  "III": { icon: Droplet, color: "text-amber-600", bg: "bg-amber-50 group-hover:bg-amber-600" },
  "IV": { icon: Cookie, color: "text-orange-600", bg: "bg-orange-50 group-hover:bg-orange-600" },
  "V": { icon: Gem, color: "text-indigo-600", bg: "bg-indigo-50 group-hover:bg-indigo-600" },
  "VI": { icon: Atom, color: "text-purple-600", bg: "bg-purple-50 group-hover:bg-purple-600" },
  "XI": { icon: Shirt, color: "text-pink-600", bg: "bg-pink-50 group-hover:bg-pink-600" },
  "XII": { icon: Footprints, color: "text-teal-600", bg: "bg-teal-50 group-hover:bg-teal-600" },
  "XVI": { icon: Cpu, color: "text-blue-600", bg: "bg-blue-50 group-hover:bg-blue-600" },
  "XVII": { icon: Car, color: "text-rose-600", bg: "bg-rose-50 group-hover:bg-rose-600" },
  "XVIII": { icon: Stethoscope, color: "text-cyan-600", bg: "bg-cyan-50 group-hover:bg-cyan-600" },
};

export default function CategoryGrid({ items }: { items: CategoryItem[] }) {
  // 精选前 8 个大类展示
  const displayItems = items.slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 标题区 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              <Boxes className="w-3.5 h-3.5 text-blue-600" />
              商品层级索引体系
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              热门商品类目快速导航
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              按照国际海关 WCO 协调制度标准体系划分，快速定位您的货物归类与所属章次
            </p>
          </div>

          <Button 
            variant="outline" 
            className="gap-2 self-start md:self-auto border-slate-200 hover:border-blue-300 hover:bg-blue-50/60 text-slate-700 hover:text-blue-700 transition-all rounded-xl" 
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
              color: "text-blue-600", 
              bg: "bg-blue-50 group-hover:bg-blue-600" 
            };
            const IconComponent = meta.icon;

            return (
              <Link 
                key={item.id} 
                href={`/category?section=${item.id}`} 
                className="group block outline-none"
              >
                <div className="h-full bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-300 transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
                  
                  {/* 悬停微光线条 */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-4">
                    {/* 头部：图标 + 罗马数字 */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl ${meta.bg} flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:shadow-md`}>
                        <IconComponent className={`w-6 h-6 ${meta.color} group-hover:text-white transition-colors duration-300`} />
                      </div>

                      <Badge 
                        variant="secondary" 
                        className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors"
                      >
                        第 {item.code} 类
                      </Badge>
                    </div>

                    {/* 类目名称 */}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed min-h-[2.75rem]">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* 底部查看提示 */}
                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-600 transition-colors">
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
