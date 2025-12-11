import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';
import { getHomeCategories } from '@/services/category.service'; // 1. 引入 Service

export default async function Home() {
    // 2. 在服务端获取数据 (这一步会自动走缓存)
    // 注意：这个操作发生在服务器端，不会暴露数据库连接给前端
    const categories = await getHomeCategories();

    // 为了首页排版美观，我们可能只想展示前 8 个或者特定的几个
    // 这里简单取前 8 个展示
    const displayCategories = categories.slice(0, 8);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />
            <main>
                <Hero />
                {/* 3. 将真实数据传递给组件 */}
                <CategoryGrid categories={displayCategories} />
                <Stats />
            </main>
            <Footer />
        </div>
    );
}