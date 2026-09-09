"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const hotTerms = [
    { code: "8517", name: "智能手机/通信设备" },
    { code: "8471", name: "计算机/笔记本" },
    { code: "8542", name: "集成电路芯片" },
    { code: "8708", name: "汽车零配件" },
    { code: "9018", name: "医疗器械" },
    { code: "6109", name: "针织T恤衫" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50/30 to-background dark:from-[#0b1426] dark:via-[#080c14] dark:to-[#080c14] pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200/60 dark:border-white/[0.08] transition-colors duration-200">
      {/* 细腻背景微光网格 */}
      <div className="absolute inset-0 -z-10 bg-grid-slate [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-60 dark:opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[720px] h-[340px] bg-gradient-to-tr from-blue-400/20 via-indigo-300/20 to-teal-300/10 dark:from-blue-600/15 dark:via-indigo-500/10 dark:to-teal-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* 顶部版本胶囊 */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-blue-200/80 dark:border-blue-500/30 shadow-xs shadow-blue-500/10 mb-6 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
          <span className="text-xs font-semibold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
            2025 全新海关商品编码与进出口税则库
          </span>
          <span className="text-[10px] bg-blue-100/80 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-mono font-bold">
            v2.5
          </span>
        </div>

        {/* 标题 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          智能海关编码查询
          <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-300 bg-clip-text text-transparent">
            与全合规关税核算系统
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          一站式秒级检索中国海关 HS Code、最惠国/普通税率、增值税、消费税、退税率及规范申报要素，支持 CIF / FOB 完税价格自动推导。
        </p>

        {/* 搜索框 */}
        <div className="mt-8 sm:mt-10 w-full max-w-2xl">
          <form 
            onSubmit={handleSearch} 
            className="p-1.5 sm:p-2 bg-white dark:bg-slate-900/90 rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-black/40 border border-slate-200/80 dark:border-white/[0.1] hover:border-blue-300 dark:hover:border-blue-500/50 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-grow flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
              <Input
                type="text"
                placeholder="输入 HS 编码 (如 8517) 或商品名称 (如 手机、芯片)..."
                className="pl-11 pr-4 h-13 text-base sm:text-lg border-0 shadow-none focus-visible:ring-0 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-100 font-medium bg-transparent"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="h-13 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-white rounded-xl shadow-md shadow-blue-600/25 active:scale-[0.98] transition-all shrink-0 cursor-pointer"
            >
              立即查询
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          {/* 热门搜索推荐 */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
              高频查询:
            </span>
            {hotTerms.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => router.push(`/search?q=${item.code}`)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-800/90 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 border border-slate-200/80 dark:border-white/[0.08] shadow-2xs transition-all cursor-pointer"
              >
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{item.code}</span>
                <span className="text-slate-500 dark:text-slate-400">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 核心价值点小标 */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>实时对标海关审单口径</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>规范申报要素一键复制</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>全贸易条款税费自动化测算</span>
          </div>
        </div>

      </div>
    </section>
  );
}
