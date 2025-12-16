import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import { getHomeCategories } from "@/services/category.service";

// 强制动态渲染 (如果分类数据不常变，也可以去掉这行用缓存)
export const dynamic = "force-dynamic";

export const runtime = 'edge';

export default async function Home() {
  // 获取分类数据 (服务端)
  const categories = await getHomeCategories();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      <Navbar />
      
      <main className="flex-grow">
        {/* 1. 顶部 Hero 搜索区 */}
        <HeroSection />

        {/* 2. 分类列表区 */}
        <CategoryGrid items={categories} />
      </main>

      <Footer />
    </div>
  );
}