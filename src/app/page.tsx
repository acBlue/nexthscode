import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import { getHomeCategories } from "@/services/category.service";

// 启用 ISR (增量静态再生成)，页面完全静态化秒开，24小时在后台增量刷新一次
export const revalidate = 86400;

export default async function Home() {
  const categories = await getHomeCategories();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* 1. 顶部 Hero 搜索区 (瞬间呈现) */}
        <HeroSection />

        {/* 2. 分类列表区 */}
        <CategoryGrid items={categories} />

        {/* 3. 统计指标看板与产品特性 */}
        <Stats />
      </main>

      <Footer />
    </div>
  );
}
