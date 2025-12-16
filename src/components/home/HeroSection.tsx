"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const hotTerms = ["8517", "手机", "笔记本", "芯片", "9018"];

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      {/* 背景装饰 (可选，增加氛围感) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] opacity-5"></div>

      <div className="container flex flex-col items-center text-center max-w-3xl mx-auto px-4">
        
        {/* 顶部小标签 */}
        <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 gap-1">
          <Sparkles className="w-3.5 h-3.5" /> 2025 新版海关编码库已更新
        </Badge>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          HS Code 查询
        </h1>
        <p className="mt-6 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          一站式查询最新的进出口税率、申报要素及监管条件。
          <span className="hidden sm:inline">数据精准，更新及时，助您通关无忧。</span>
        </p>

        {/* 搜索框区域 */}
        <div className="mt-8 w-full max-w-xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="输入 HS 编码 (如 8517) 或商品名称..."
                className="pl-10 h-12 text-base shadow-sm border-gray-200 focus-visible:ring-blue-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 shadow-md transition-all active:scale-95"
            >
              搜索
            </Button>
          </form>

          {/* 热门搜索 */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>热门搜索:</span>
            {hotTerms.map((term) => (
              <Badge 
                key={term} 
                variant="outline" 
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-2 py-0.5 font-normal"
                onClick={() => router.push(`/search?q=${term}`)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}